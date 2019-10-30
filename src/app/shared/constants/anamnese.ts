export const ANAMNESE = [
    {
        title: 'Introdução',
        children: [
            {control: 'queixaPrincipal', label: 'Queixa Principal'},
            {control: 'hda', label: 'Hda'},
            {control: 'hpp', label: 'Hpp'},
            {control: 'historicoFamiliar', label: 'Histórico Familiar'},
            {control: 'observacoes', label: 'Observações'},
            {control: 'informarcoesGerais', label: 'Informações Gerais'},
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
            {control: 'informacoesGeraisFisico', label: 'Informações Gerais'},
        ]
    },
    {
        title: 'Aparelho CardioRespiratório',
        children: [
            {control: 'auscultaPulmonar', label: 'Ausculta Pulmonar'},
            {control: 'auscultaCardiaca', label: 'Ausculta Cardíaca'},
            {control: 'informacoesGeraisCardioRespiratório', label: 'Informações Gerais'}
        ]
    },
    {
        title: 'Sinais Vitais',
        children: [
            {control: 'pa', label: 'PA'},
            {control: 'fc', label: 'FC'},
            {control: 'fr', label: 'FR'},
            {control: 'tax', label: 'Táx'},
            {control: 'informacoesGeraisVitais', label: 'Informações Gerais'}
        ]
    },
    {
        title: 'Exame Antropométrico',
        children: [
            {control: 'pesoAltura', label: 'Peso/Altura'},
            {control: 'obsFinais', label: 'Obs Finais'},
            {control: 'cd', label: 'Cd'},
            {control: 'informacoesGeraisAntropometrico', label: 'Informações Gerais'}
        ]
    },
    {
        title: 'Observações de Resultados de Exames',
        children: [
            {control: 'informacoesGeraisExames', label: 'Informações Gerais'}
        ]
    },
    {
        title: 'Hipótese de Diagnóstico',
        children: [
            {control: 'informacoesGeraisDiagnostico', label: 'Informações Gerais'}
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
