enum Lugar {
    'novaAmerica' = 1,
    'madureira' = 2,
}

export class LugarEnum {
    static obterDescricao(num: number): string {
        switch (Lugar[num]) {
            case 'novaAmerica': return 'Nova América';
            case 'madureira': return 'Madureira';
            default: return undefined;
        }
    }

    static obterNumerador(str: string): number {
        const descricao = str as keyof typeof Lugar;
        return Lugar[descricao];
    }

    static valueOfDescription(str: string): string {
        const descricao = str as keyof typeof Lugar;
        return this.obterDescricao(Lugar[descricao]);
    }
}
