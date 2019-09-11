
export abstract class CalendarioData {
    abstract getData(id: number): any[];
    abstract async getDataWithLoading(): Promise<any[]>;
    abstract async getDate(id: number): Promise<any>;
  }
