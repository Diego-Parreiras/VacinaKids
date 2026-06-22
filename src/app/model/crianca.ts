import { RegistroVacina } from "./registro-vacina";

export class Crianca {
    private id: number;
    private nome: string;
    private sexo: string;
    private dataDeNascimento: Date;
    private registroVacinas: RegistroVacina[];

    constructor(id: number, nome: string, sexo: string, dataDeNascimento: Date, registroVacinas: RegistroVacina[]) {
        this.id = id;
        this.nome = nome;
        this.sexo = sexo;
        this.dataDeNascimento = dataDeNascimento;
        this.registroVacinas = registroVacinas;
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

    public getSexo(): string {
        return this.sexo;
    }

    public setSexo(sexo: string): void {
        this.sexo = sexo;
    }

    public getDataDeNascimento(): Date {
        return this.dataDeNascimento;
    }

    public setDataDeNascimento(dataDeNascimento: Date): void {
        this.dataDeNascimento = dataDeNascimento;
    }

    public getRegistroVacinas(): RegistroVacina[] {
        return this.registroVacinas;
    }

    public setRegistroVacinas(registroVacinas: RegistroVacina[]): void {
        this.registroVacinas = registroVacinas;
    }
}