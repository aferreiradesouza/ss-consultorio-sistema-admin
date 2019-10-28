export const prontuarios = [
    {
        title: 'Introdução',
        children: [
            {control: 'queixaPrincipal', label: 'Queixa Principal'},
            {control: 'hda', label: 'Hda'},
            {control: 'hpp', label: 'Hpp'},
            {control: 'historicoFamiliar', label: 'Histórico Familiar'},
            {control: 'observacoes', label: 'Observações'},
            {control: 'informacoesGeraisIntroducao', label: 'Informações Gerais'},
        ]
    },
    {
        title: 'Exame Físico',
        children: [
            {control: 'cabecaPescoco', label: 'Cabeça/Pescoço'},
            {control: 'torax', label: 'Torax'},
            {control: 'mmss', label: 'Mmss'},
            {control: 'abdome', label: 'Abdome'},
            {control: 'mmii', label: 'MMII'},
            {control: 'informacoesGeraisExameFisico', label: 'Informações Gerais'},
        ]
    },
    {
        title: 'Aparelho CardioRespiratório',
        children: [
            {control: 'auscultaPulmonar', label: 'Ausculta Pulmonar'},
            {control: 'auscultaCardiaca', label: 'Ausculta Cardíaca'},
            {control: 'informacoesGeraisAparelhoCardioRespiratorio', label: 'Informações Gerais'}
        ]
    },
    {
        title: 'Sinais Vitais',
        children: [
            {control: 'pa', label: 'PA'},
            {control: 'fc', label: 'FC'},
            {control: 'fr', label: 'FR'},
            {control: 'tax', label: 'Táx'},
            {control: 'informacoesGeraisSinaisVitais', label: 'Informações Gerais'}
        ]
    },
    {
        title: 'Exame Antropométrico',
        children: [
            {control: 'pesoAltura', label: 'Peso/Altura'},
            {control: 'ObsFinais', label: 'Obs Finais'},
            {control: 'cd', label: 'Cd'},
            {control: 'informacoesGeraisExameAntropometrico', label: 'Informações Gerais'}
        ]
    },
    {
        title: 'Observações de Resultados de Exames',
        children: [
            {control: 'informacoesGeraisObservacoesResultadosExames', label: 'Informações Gerais'}
        ]
    },
    {
        title: 'Hipótese de Diagnóstico',
        children: [
            {control: 'informacoesGeraisHipoteseDiagnostico', label: 'Informações Gerais'}
        ]
    },
    {
        title: 'Outros',
        children: [
            {control: 'motivo', label: 'Motivo'},
            {control: 'cid', label: 'CID'},
            {control: 'resumoAtendimento', label: 'Resumo do Atendimento'},
            {control: 'tipoDoenca', label: 'Tipo de Doença'}
        ]
    },
] as Array<{ title: string; children: Array<{ control: string; label: string }> }>;
