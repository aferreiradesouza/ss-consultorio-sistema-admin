export abstract class UsuariosData {
    abstract getData(): any[];
    abstract async getDataWithLoading(): Promise<any[]>;
    abstract async getDataPerId(id: number): Promise<any>;
}
