# 👦🏽🛡️ VacinaKids | Desafio Frontend Cyrrus

Plataforma digital responsiva para acompanhamento da jornada de vacinação infantil, desenvolvida como solução para o desafio técnico de Estágio Frontend da Cyrrus. 

O objetivo principal do VacinaKids é digitalizar e simplificar a carteira física de vacinação, permitindo que pais e responsáveis gerenciem o histórico de saúde de suas crianças de forma intuitiva e segura.

---

## 🎯 Cenários Atendidos

O projeto foi arquitetado para resolver 100% dos cenários propostos no desafio:

1. **Gestão de Faixa Etária:** Identificação visual clara de quais vacinas já foram aplicadas e quais requerem atenção (Pendente vs. Em Dia).
2. **Alertas de Atraso:** Regras de negócio que calculam automaticamente a idade da criança e cruzam com o catálogo de vacinas, sinalizando visualmente vacinas com data prevista ultrapassada (Status: `ATRASADA`).
3. **Campanhas Ativas:** Exibição dinâmica de campanhas de vacinação públicas vigentes, separadas em componentes modulares.
4. **Múltiplos Dependentes:** Suporte ao cadastro de diversos filhos sob uma mesma conta de responsável, garantindo isolamento total de históricos e informações.

---

## 🚀 Diferenciais e Funcionalidades Extras

Além dos requisitos mínimos, a aplicação conta com as seguintes features para agregar valor à solução digital:

- **Sistema de Autenticação (SaaS):** Fluxo completo de Login e Cadastro, com guarda de rotas (`AuthGuard`) impedindo acesso não autorizado ao Dashboard.
- **Persistência de Dados Inteligente:** Uso avançado de `LocalStorage` atuando como um banco de dados NoSQL estruturado. A aplicação suporta múltiplos usuários, cada um com sua própria lista de filhos isolada.
- **Progressive Disclosure (UX):** Formulários expansíveis no Dashboard. A opção de informar a data da vacina só é exibida dinamicamente caso o usuário marque o *checkbox* correspondente.
- **Fidelidade Visual:** Interface desenvolvida estritamente sobre a paleta de cores exigida (`#ABC270`, `#FEC868`, `#FDA769`, `#473C33`), com design responsivo (Mobile First adaptado para Tablet e Desktop).

---

## 💻 Tecnologias e Arquitetura

O projeto foi construído utilizando:

- **Angular (Framework Frontend)**
- **TypeScript** (Tipagem estática e segurança)
- **HTML5 & CSS3** (Flexbox e CSS Grid para layouts fluidos)

### Decisões Arquiteturais:
- **Programação Orientada a Objetos (POO):** Modelagem de domínio realística utilizando classes (Modelos: `Crianca`, `Vacina`, `RegistroVacina`, `Campanha`). As regras de negócio de cálculo de atraso ficam isoladas na camada de Serviço.
- **Componentização:** Padrão de desenvolvimento focado em reusabilidade. Cards de crianças e banners de campanhas foram isolados em componentes independentes (`<app-card-crianca>`, `<app-card-campanha>`), recebendo dados via `@Input()`.
- **Injeção de Dependências:** Centralização do estado da aplicação e da comunicação com o "banco de dados" local através do `VacinacaoService`.

---

## ⚙️ Como Executar o Projeto Localmente

Siga as instruções abaixo para rodar a aplicação em seu ambiente de desenvolvimento.

### Pré-requisitos
- [Node.js](https://nodejs.org/) instalado na máquina.
- [Angular CLI](https://angular.io/cli) instalado globalmente (`npm install -g @angular/cli`).


   
