import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Necessário para o formulário
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

    // Variáveis do formulário de baixa
    public registroSelecionadoId: string = '';
    public dataAplicacao: string = '';

    constructor(
        private route: ActivatedRoute,
        private vacinacaoService: VacinacaoService
    ) { }

    ngOnInit(): void {
        this.carregarTela();
    }

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
     * Filtra o histórico para o formulário mostrar apenas as vacinas que faltam
     */
    public getVacinasPendentes(): RegistroVacina[] {
        return this.historico.filter(r => r.getStatus() !== 'APLICADA');
    }

    /**
     * Envia os dados para o serviço e atualiza a tela
     */
    public registrarAplicacao(): void {
        if (this.registroSelecionadoId && this.dataAplicacao) {
            this.vacinacaoService.registrarVacina(this.criancaId, Number(this.registroSelecionadoId), this.dataAplicacao);

            // Limpa o formulário
            this.registroSelecionadoId = '';
            this.dataAplicacao = '';

            // Recarrega a tela para a cor do card mudar na mesma hora
            this.carregarTela();
        } else {
            alert('Por favor, selecione a vacina e a data de aplicação.');
        }
    }
}