import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { VacinacaoService } from '../../services/vacinacao.service';
import { Crianca } from '../../model/crianca';
import { Campanha } from '../../model/campanha';
import { Vacina } from '../../model/vacina';
import { CardCriancaComponent } from '../../components/card-crianca/card-crianca.component';
import { CardCampanhaComponent } from '../../components/card-campanha/card-campanha.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, CardCriancaComponent, CardCampanhaComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public criancas: Crianca[] = [];
  public campanhas: Campanha[] = [];
  public catalogoVacinas: Vacina[] = [];

  public nomeUsuario: string | null = '';
  public mostrarFormulario: boolean = false;

  public novoNome: string = '';
  public novoSexo: string = '';
  public novaData: string = '';
  public mensagemErro: string = '';
  public dataHoje: string = new Date().toISOString().split('T')[0];

  public vacinasSelecionadas: { [id: number]: boolean } = {};
  public vacinasDatas: { [id: number]: string } = {};

  constructor(
    private vacinacaoService: VacinacaoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.nomeUsuario = this.vacinacaoService.getUsuarioAtivo();
    this.catalogoVacinas = this.vacinacaoService.getCatalogoVacinas();
    this.atualizarListas();
  }

  /**
   * Sincroniza as propriedades locais com os dados do serviço.
   */
  private atualizarListas(): void {
    this.criancas = this.vacinacaoService.getCriancas();
    this.campanhas = this.vacinacaoService.getCampanhas();
  }

  public toggleFormulario(): void {
    this.mostrarFormulario = !this.mostrarFormulario;
  }

  /**
   * Processa os dados do formulário e cria um novo registro de dependente.
   */
  public adicionarNovoFilho(): void {
    if (!this.novoNome || !this.novoSexo || !this.novaData) {
      alert('Por favor, preencha os dados básicos (Nome, Sexo e Data).');
      return;
    }

    const dataNascimento = new Date(this.novaData + 'T00:00:00');
    const vacinasTomadas = this.catalogoVacinas
      .filter(v => this.vacinasSelecionadas[v.getId()])
      .map(v => {
        const dataEscolhida = this.vacinasDatas[v.getId()];
        const dataFinal = dataEscolhida ? dataEscolhida : new Date().toISOString().split('T')[0];
        return { id: v.getId(), dataStr: dataFinal };
      });
      
    // Validação de data limite para nascimento
    if (this.novaData > this.dataHoje) {
      this.exibirErro('A data de nascimento não pode estar no futuro.');
      return;
    }

    // Validação de data limite para vacinas selecionadas
    for (let vacinaId in this.vacinasSelecionadas) {
      if (this.vacinasSelecionadas[vacinaId] && this.vacinasDatas[vacinaId] > this.dataHoje) {
        this.exibirErro('A data da vacina não pode estar no futuro.');
        return;
      }
    }

    this.vacinacaoService.adicionarCrianca(this.novoNome, this.novoSexo, dataNascimento, vacinasTomadas);
    this.limparFormulario();
    this.atualizarListas();
  }

  private limparFormulario(): void {
    this.novoNome = '';
    this.novoSexo = '';
    this.novaData = '';
    this.vacinasSelecionadas = {};
    this.vacinasDatas = {};
    this.mostrarFormulario = false;
  }
  
  public exibirErro(mensagem: string): void {
    this.mensagemErro = mensagem;
    setTimeout(() => {
      this.mensagemErro = '';
    }, 3000); 
  }

  /**
   * Encerra a sessão do usuário ativo.
   */
  public sair(): void {
    this.vacinacaoService.logout();
    this.router.navigate(['/login']);
  }
}