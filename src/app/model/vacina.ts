export class Vacina {
    private id: number;
    private nome: string;
    private mesesRecomendados: number;

    constructor(id: number, nome: string, mesesRecomendados: number) {
        this.id = id;
        this.nome = nome;
        this.mesesRecomendados = mesesRecomendados;
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

    public getMesesRecomendados(): number {
        return this.mesesRecomendados;
    }

    public setMesesRecomendados(mesesRecomendados: number): void {
        this.mesesRecomendados = mesesRecomendados;
    }
}