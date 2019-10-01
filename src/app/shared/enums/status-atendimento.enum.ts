enum StatusAtendimento {
    'aguardando_confirmacao' = 'Aguardando Confirmação',
    'confirmado' = 'Confirmado',
    'em_espera' = 'Em Espera',
    'em_atendimento' = 'Em Atendimento',
    'atendimento_finalizado' = 'Atendimento Finalizado',
    'cancelado' = 'Cancelado',
    'pre_agendamento' = 'Pré-agendamento',
    'desistiu' = 'Desistiu',
    'faturado' = 'Faturado',
}

export class StatusAtendimentoEnum {
    static obterDescricao(str: string): string {
        return StatusAtendimento[str];
    }

    static obterCodigo(str: string): string {
        const descricao = str as keyof typeof StatusAtendimento;
        return StatusAtendimento[descricao];
    }

    static valueOfDescription(str: string): string {
        const descricao = str as keyof typeof StatusAtendimento;
        return this.obterDescricao(StatusAtendimento[descricao]);
    }
}
