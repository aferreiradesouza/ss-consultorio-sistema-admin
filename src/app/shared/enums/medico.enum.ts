enum Medico {
    'andreDomarco' = 1,
    'rafaelSilveira' = 2,
}

export class MedicoEnum {
    static obterDescricao(num: number): string {
        switch (Medico[num]) {
            case 'andreDomarco': return 'André Domarco';
            case 'rafaelSilveira': return 'Rafael Silveira';
            default: return undefined;
        }
    }

    static obterNumerador(str: string): number {
        const descricao = str as keyof typeof Medico;
        return Medico[descricao];
    }

    static valueOfDescription(str: string): string {
        const descricao = str as keyof typeof Medico;
        return this.obterDescricao(Medico[descricao]);
    }
}
