
export abstract class CalendarioData {
    abstract getData(): any[];
    abstract async getDate(id: number): Promise<any>;
  }
