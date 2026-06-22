import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { VacinacaoService } from '../../services/vacinacao.service';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    public nomeUsuario: string = '';
    public senhaUsuario: string = '';
    public modoCadastro: boolean = false; // Controla se a tela é de Login ou Cadastro

    constructor(private router: Router, private vacinacaoService: VacinacaoService) { }

    public submeterFormulario(): void {
        if (this.nomeUsuario.trim() === '' || this.senhaUsuario.trim() === '') {
            alert('Por favor, preencha nome e senha.');
            return;
        }

        if (this.modoCadastro) {
            // Tenta Cadastrar
            const sucesso = this.vacinacaoService.cadastrarUsuario(this.nomeUsuario, this.senhaUsuario);
            if (sucesso) {
                alert('Conta criada com sucesso! Faça login para entrar.');
                this.modoCadastro = false;
                this.senhaUsuario = '';
            } else {
                alert('Este nome de usuário já está em uso.');
            }
        } else {
            // Tenta Logar
            const sucesso = this.vacinacaoService.login(this.nomeUsuario, this.senhaUsuario);
            if (sucesso) {
                this.router.navigate(['/dashboard']);
            } else {
                alert('Usuário ou senha incorretos.');
            }
        }
    }

    public alternarModo(): void {
        this.modoCadastro = !this.modoCadastro;
        this.nomeUsuario = '';
        this.senhaUsuario = '';
    }
}