enum Visao {
    'dia' = 1,
    'semana' = 2,
}

export class VisaoEnum {
    static obterDescricao(num: number): string {
        switch (Visao[num]) {
            case 'dia': return 'Dia';
            case 'semana': return 'Semana';
            default: return undefined;
        }
    }

    static obterNumerador(str: string): number {
        const descricao = str as keyof typeof Visao;
        return Visao[descricao];
    }

    static valueOfDescription(str: string): string {
        const descricao = str as keyof typeof Visao;
        return this.obterDescricao(Visao[descricao]);
    }
}
