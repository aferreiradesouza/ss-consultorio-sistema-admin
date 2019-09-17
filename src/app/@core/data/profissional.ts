export abstract class ProfissionalData {
    abstract getData(): any[];
    abstract async getProfissionaisWithLoading(): Promise<any[]>;
    abstract async getProfissional(id: number): Promise<any>;
}
