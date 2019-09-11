enum Especialidade {
    'clinicoGeral' = 1,
    'cargiologista' = 2,
}

export class EspecialidadeEnum {
    static obterDescricao(num: number): string {
        switch (Especialidade[num]) {
            case 'clinicoGeral': return 'Clínico Geral';
            case 'cargiologista': return 'Cardiologista';
            default: return undefined;
        }
    }

    static obterNumerador(str: string): number {
        const descricao = str as keyof typeof Especialidade;
        return Especialidade[descricao];
    }

    static valueOfDescription(str: string): string {
        const descricao = str as keyof typeof Especialidade;
        return this.obterDescricao(Especialidade[descricao]);
    }
}
