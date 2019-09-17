
export abstract class ConsultoriosData {
    abstract getData(): any[];
    abstract async getConsultorioWithLoading(): Promise<any[]>;
    abstract async getConsultorio(id: number): Promise<any>;
}
