import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Crianca } from '../model/crianca';
import { Vacina } from '../model/vacina';
import { RegistroVacina } from '../model/registro-vacina';
import { Campanha } from '../model/campanha';

@Injectable({
  providedIn: 'root'
})
export class VacinacaoService {

  private usuarios: any[] = [];
  private campanhas: Campanha[] = [];
  private usuarioAtivo: any = null;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.carregarDados();
  }

  /* --- AUTENTICAÇÃO E SESSÃO --- */

  public login(nome: string, senha: string): boolean {
    const user = this.usuarios.find(u => u.nome === nome && u.senha === senha);
    if (user) {
      this.usuarioAtivo = user;
      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem('usuario_logado', nome);
      }
      return true;
    }
    return false;
  }

  public cadastrarUsuario(nome: string, senha: string): boolean {
    const existe = this.usuarios.find(u => u.nome === nome);
    if (existe) return false; 

    const novoUsuario = { nome: nome, senha: senha, criancas: [] };
    this.usuarios.push(novoUsuario);
    this.salvarDadosLocais();
    return true;
  }

  public getUsuarioAtivo(): string | null {
    return this.usuarioAtivo ? this.usuarioAtivo.nome : null;
  }

  public isLogado(): boolean {
    return this.usuarioAtivo !== null;
  }

  public logout(): void {
    this.usuarioAtivo = null;
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('usuario_logado');
    }
  }

  /* --- GESTÃO DE DADOS (DOMÍNIO) --- */

  public getCriancas(): Crianca[] {
    return this.usuarioAtivo ? this.usuarioAtivo.criancas : [];
  }

  public getCampanhas(): Campanha[] {
    return this.campanhas;
  }

  public getHistorico(criancaId: number): RegistroVacina[] {
    if (!this.usuarioAtivo) return [];
    const criancaEncontrada = this.usuarioAtivo.criancas.find((c: Crianca) => c.getId() === criancaId);
    return criancaEncontrada ? criancaEncontrada.getRegistroVacinas() : [];
  }

  /**
   * Avalia a situação vacinal com base na data de nascimento e o prazo estipulado.
   */
  public calcularStatusVacina(dataNascimento: Date, mesesRecomendados: number): string {
    const dataLimite = new Date(dataNascimento);
    dataLimite.setMonth(dataLimite.getMonth() + mesesRecomendados);
    const dataAtual = new Date();
    return (dataAtual > dataLimite) ? 'ATRASADA' : 'PENDENTE';
  }

  public getCatalogoVacinas(): Vacina[] {
    return [
      new Vacina(1, 'BCG', 0),
      new Vacina(2, 'Hepatite B', 0),
      new Vacina(3, 'Poliomielite (VIP)', 2),
      new Vacina(4, 'Pentavalente', 2),
      new Vacina(5, 'Rotavírus', 2),
      new Vacina(6, 'Tríplice Viral', 12)
    ];
  }

  /**
   * Instancia uma nova criança, gerando automaticamente sua caderneta de vacinação
   * com base no catálogo padrão e processando vacinas prévias informadas.
   */
  public adicionarCrianca(nome: string, sexo: string, dataNascimento: Date, vacinasJaTomadas: {id: number, dataStr: string}[] = []): void {
    if (!this.usuarioAtivo) return;

    const filhosDoUsuario = this.usuarioAtivo.criancas;
    const novoId = filhosDoUsuario.length > 0 ? Math.max(...filhosDoUsuario.map((c: Crianca) => c.getId())) + 1 : 1;

    const catalogo = this.getCatalogoVacinas();
    const historicoNovo: RegistroVacina[] = catalogo.map((vacina, index) => {
      let status = this.calcularStatusVacina(dataNascimento, vacina.getMesesRecomendados());
      let dataAdmin = null;

      const tomada = vacinasJaTomadas.find(v => v.id === vacina.getId());
      if (tomada) {
        status = 'APLICADA';
        dataAdmin = new Date(tomada.dataStr + 'T00:00:00'); 
      }

      const registroId = new Date().getTime() + index;
      return new RegistroVacina(registroId, vacina, dataAdmin as any, status);
    });

    const novaCrianca = new Crianca(novoId, nome, sexo, dataNascimento, historicoNovo);
    this.usuarioAtivo.criancas.push(novaCrianca);
    this.salvarDadosLocais();
  }

  /**
   * Atualiza o registro específico de uma vacina pendente para aplicada.
   */
  public registrarVacina(criancaId: number, registroId: number, dataAplicacao: string): void {
    if (!this.usuarioAtivo) return;

    const crianca = this.usuarioAtivo.criancas.find((c: Crianca) => c.getId() === criancaId);
    if (crianca) {
      const registro = crianca.getRegistroVacinas().find((r: RegistroVacina) => r.getId() === registroId);
      if (registro) {
        const data = new Date(dataAplicacao + 'T00:00:00');
        (registro as any).dataDeAdministracao = data;
        (registro as any).status = 'APLICADA';
        this.salvarDadosLocais();
      }
    }
  }

  /* --- PERSISTÊNCIA LOCAL --- */

  private carregarDados(): void {
    if (isPlatformBrowser(this.platformId)) {
      const dadosSalvos = localStorage.getItem('vacinacao_dados_v2');

      if (dadosSalvos) {
        const parsed = JSON.parse(dadosSalvos);
        
        this.campanhas = parsed.campanhas.map((c: any) =>
          new Campanha(c.id, c.titulo, c.descricao, new Date(c.dataFim))
        );

        this.usuarios = parsed.usuarios.map((u: any) => {
          const criancasReconstruidas = u.criancas.map((c: any) => {
            const historico = c.registroVacinas.map((r: any) => {
              const vacina = new Vacina(r.vacina.id, r.vacina.nome, r.vacina.mesesRecomendados);
              return new RegistroVacina(
                r.id, vacina, r.dataDeAdministracao ? new Date(r.dataDeAdministracao) : null as any, r.status
              );
            });
            return new Crianca(c.id, c.nome, c.sexo, new Date(c.dataNascimento), historico);
          });
          return { nome: u.nome, senha: u.senha, criancas: criancasReconstruidas };
        });

        const userLogado = localStorage.getItem('usuario_logado');
        if (userLogado) {
          this.usuarioAtivo = this.usuarios.find(u => u.nome === userLogado) || null;
        }

      } else {
        this.inicializarBaseDeDadosMock();
        this.salvarDadosLocais();
      }
    } else {
      this.inicializarBaseDeDadosMock();
    }
  }

  public salvarDadosLocais(): void {
    if (isPlatformBrowser(this.platformId)) {
      const dadosParaSalvar = { usuarios: this.usuarios, campanhas: this.campanhas };
      localStorage.setItem('vacinacao_dados_v2', JSON.stringify(dadosParaSalvar));
    }
  }

  private inicializarBaseDeDadosMock(): void {
    this.campanhas.push(new Campanha(1, 'Campanha Nacional de Multivacinação', 'Atualização da caderneta para crianças e adolescentes', new Date(2026, 7, 30)));
    this.campanhas.push(new Campanha(2, 'Vacinação contra a Gripe', 'Grupos prioritários, incluindo crianças menores de 6 anos', new Date(2026, 6, 15)));

    const usuarioMock = { nome: 'Admin', senha: '123', criancas: [] as Crianca[] };

    const vacinaBcg = new Vacina(1, 'BCG', 0);
    const vacinaHepB = new Vacina(2, 'Hepatite B', 0);
    const vacinaPolio = new Vacina(3, 'Poliomielite (VIP)', 2);
    
    const nascimentoEnzo = new Date(2025, 5, 10);
    const historicoEnzo = [
      new RegistroVacina(1, vacinaBcg, new Date(2025, 5, 12), 'APLICADA'),
      new RegistroVacina(2, vacinaPolio, null as any, 'ATRASADA')
    ];
    usuarioMock.criancas.push(new Crianca(1, 'Enzo', 'M', nascimentoEnzo, historicoEnzo));

    this.usuarios.push(usuarioMock);
  }
}