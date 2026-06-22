import { Vacina } from "./vacina";

export class RegistroVacina {
    private id: number;
    private vacina: Vacina;
    private dataDeAdministracao: Date;
    private status: String;

    constructor(id: number, vacina: Vacina, dataDeAdministracao: Date, status: String) {
        this.id = id;
        this.vacina = vacina;
        this.dataDeAdministracao = dataDeAdministracao;
        this.status = status;
    }

    public getId(): number {
        return this.id;
    }

    public setId(id: number): void {
        this.id = id;
    }

    public getVacina(): Vacina {
        return this.vacina;
    }

    public setVacina(vacina: Vacina): void {
        this.vacina = vacina;
    }

    public getDataDeAdministracao(): Date {
        return this.dataDeAdministracao;
    }

    public setDataDeAdministracao(dataDeAdministracao: Date): void {
        this.dataDeAdministracao = dataDeAdministracao;
    }

    public getStatus(): String {
        return this.status;
    }

    public setStatus(status: String): void {
        this.status = status;
    }
}