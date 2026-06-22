export class Campanha {
    private id: number;
    private titulo: string;
    private descricao: string;
    private dataFim: Date;

    constructor(id: number, titulo: string, descricao: string, dataFim: Date) {
        this.id = id;
        this.titulo = titulo;
        this.descricao = descricao;
        this.dataFim = dataFim;
    }

    public getId(): number {
        return this.id;
    }

    public setId(id: number): void {
        this.id = id;
    }

    public getTitulo(): string {
        return this.titulo;
    }

    public setTitulo(titulo: string): void {
        this.titulo = titulo;
    }

    public getDescricao(): string {
        return this.descricao;
    }

    public setDescricao(descricao: string): void {
        this.descricao = descricao;
    }

    public getDataFim(): Date {
        return this.dataFim;
    }

    public setDataFim(dataFim: Date): void {
        this.dataFim = dataFim;
    }
}