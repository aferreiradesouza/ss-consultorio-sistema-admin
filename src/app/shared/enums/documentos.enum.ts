enum Documentos {
    'laudo' = 1,
    'atestado' = 2,
    'pedidoDeExame' = 3,
    'receita' = 4,
}

export class DocumentosEnum {
    static obterDescricao(num: number): string {
        switch (Documentos[num]) {
            case 'laudo': return 'Laudo';
            case 'atestado': return 'Atestado';
            case 'pedidoDeExame': return 'Pedido de Exame';
            case 'receita': return 'Receita';
            default: return undefined;
        }
    }

    static obterNumerador(str: string): number {
        const descricao = str as keyof typeof Documentos;
        return Documentos[descricao];
    }

    static valueOfDescription(str: string): string {
        const descricao = str as keyof typeof Documentos;
        return this.obterDescricao(Documentos[descricao]);
    }
}
