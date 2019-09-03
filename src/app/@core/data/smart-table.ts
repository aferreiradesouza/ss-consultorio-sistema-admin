
export abstract class SmartTableData {
  abstract getData(): any[];
  abstract async getID(id: number): Promise<any>;
}
