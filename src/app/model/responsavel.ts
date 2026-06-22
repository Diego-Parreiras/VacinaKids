import { Crianca } from "./crianca";

export class Responsavel {
    private id: number;
    private nome: string;
    private email: string;
    private endereco: string;
    private listaDeCriancas: Crianca[];

    constructor(id: number, nome: string, email: string, endereco: string, listaDeCriancas: Crianca[]) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.endereco = endereco;
        this.listaDeCriancas = listaDeCriancas;
    }

    public getId(): number {
        return this.id;
    }

    public setId(id: number): void {
        this.id = id;
    }

    public getNome(): string {
        return this.nome;
    }

    public setNome(nome: string): void {
        this.nome = nome;
    }

    public getEmail(): string {
        return this.email;
    }

    public setEmail(email: string): void {
        this.email = email;
    }

    public getEndereco(): string {
        return this.endereco;
    }

    public setEndereco(endereco: string): void {
        this.endereco = endereco;
    }

    public getListaDeCriancas(): Crianca[] {
        return this.listaDeCriancas;
    }

    public setListaDeCriancas(listaDeCriancas: Crianca[]): void {
        this.listaDeCriancas = listaDeCriancas;
    }
}