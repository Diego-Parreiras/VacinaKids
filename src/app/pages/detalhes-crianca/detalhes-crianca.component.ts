import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { VacinacaoService } from '../../services/vacinacao.service';
import { RegistroVacina } from '../../model/registro-vacina';

@Component({
  selector: 'app-detalhes-crianca',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './detalhes-crianca.component.html',
  styleUrls: ['./detalhes-crianca.component.css']
})
export class DetalhesCriancaComponent implements OnInit {

  public historico: RegistroVacina[] = [];
  public nomeCrianca: string = '';
  private criancaId: number = 0;
  
  public mensagemErro: string = '';
  public dataHoje: string = new Date().toISOString().split('T')[0];
  public registroSelecionadoId: string = '';
  public dataAplicacao: string = '';

  constructor(
    private route: ActivatedRoute,
    private vacinacaoService: VacinacaoService
  ) { }

  ngOnInit(): void {
    this.carregarTela();
  }

  /**
   * Obtém os dados da criança com base no ID da rota atual.
   */
  public carregarTela(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.criancaId = Number(idParam);
      this.historico = this.vacinacaoService.getHistorico(this.criancaId);

      const crianca = this.vacinacaoService.getCriancas().find(c => c.getId() === this.criancaId);
      if (crianca) {
        this.nomeCrianca = crianca.getNome();
      }
    }
  }

  /**
   * Filtra o histórico retornando apenas as vacinas não aplicadas.
   */
  public getVacinasPendentes(): RegistroVacina[] {
    return this.historico.filter(r => r.getStatus() !== 'APLICADA');
  }

  /**
   * Valida os dados do formulário e registra a aplicação da vacina selecionada.
   */
  public registrarAplicacao(): void {
    if (!this.registroSelecionadoId || !this.dataAplicacao) {
      this.exibirErro('Por favor, selecione a vacina e a data de aplicação.');
      return;
    }

    if (this.dataAplicacao > this.dataHoje) {
      this.exibirErro('A data da vacina não pode estar no futuro.');
      return;
    }

    this.vacinacaoService.registrarVacina(this.criancaId, Number(this.registroSelecionadoId), this.dataAplicacao);

    this.registroSelecionadoId = '';
    this.dataAplicacao = '';
    this.carregarTela();
  }

  /**
   * Exibe uma notificação de erro temporária na interface.
   * @param mensagem Texto a ser exibido.
   */
  public exibirErro(mensagem: string): void {
    this.mensagemErro = mensagem;
    setTimeout(() => {
      this.mensagemErro = '';
    }, 3000);
  }
}