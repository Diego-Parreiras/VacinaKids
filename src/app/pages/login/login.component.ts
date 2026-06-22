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
  public modoCadastro: boolean = false;
  
  public forcaSenha: 'fraca' | 'media' | 'forte' | '' = '';

  constructor(private router: Router, private vacinacaoService: VacinacaoService) { }

  /**
   * Avalia a força da senha digitada com base em comprimento e caracteres presentes.
   */
  public avaliarSenha(): void {
    if (!this.modoCadastro || this.senhaUsuario.length === 0) {
      this.forcaSenha = '';
      return;
    }

    const temTamanhoAdequado = this.senhaUsuario.length >= 6;
    const temNumero = /\d/.test(this.senhaUsuario);
    const temMaiuscula = /[A-Z]/.test(this.senhaUsuario);
    const temEspecial = /[!@#$%^&*(),.?":{}|<>]/.test(this.senhaUsuario);

    let pontuacao = 0;
    if (temTamanhoAdequado) pontuacao += 1;
    if (temNumero) pontuacao += 1;
    if (temMaiuscula) pontuacao += 1;
    if (temEspecial) pontuacao += 1;

    if (pontuacao <= 1 || this.senhaUsuario.length < 5) {
      this.forcaSenha = 'fraca';
    } else if (pontuacao === 2 || pontuacao === 3) {
      this.forcaSenha = 'media';
    } else {
      this.forcaSenha = 'forte';
    }
  }

  /**
   * Processa a autenticação ou criação de conta validando os requisitos mínimos.
   */
  public submeterFormulario(): void {
    if (this.nomeUsuario.trim() === '' || this.senhaUsuario.trim() === '') {
      alert('Por favor, preencha nome e senha.');
      return;
    }

    if (this.modoCadastro) {
      if (this.forcaSenha === 'fraca') {
        alert('A senha informada é muito fraca. Tente adicionar números, letras maiúsculas ou caracteres especiais.');
        return;
      }

      const sucesso = this.vacinacaoService.cadastrarUsuario(this.nomeUsuario, this.senhaUsuario);
      if (sucesso) {
        alert('Conta criada com sucesso! Faça login para entrar.');
        this.alternarModo(); 
      } else {
        alert('Este nome de usuário já está em uso.');
      }
    } else {
      const sucesso = this.vacinacaoService.login(this.nomeUsuario, this.senhaUsuario);
      if (sucesso) {
        this.router.navigate(['/dashboard']);
      } else {
        alert('Usuário ou senha incorretos.');
      }
    }
  }

  /**
   * Alterna a interface entre as telas de Login e Cadastro, limpando os dados.
   */
  public alternarModo(): void {
    this.modoCadastro = !this.modoCadastro;
    this.nomeUsuario = '';
    this.senhaUsuario = '';
    this.forcaSenha = '';
  }
}