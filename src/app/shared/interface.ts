interface DefaultHttpResponse {
    mensagens: string[];
    autorizado: boolean;
    codigo: string;
    tempoLevado: string;
    sucesso: boolean;
}

export interface IObterPaciente extends DefaultHttpResponse {
    objeto: ListagemPacientes[];
}

export interface IObterInfoPaciente extends DefaultHttpResponse {
    objeto: Paciente;
}

export interface IEditarPaciente extends DefaultHttpResponse {
    objeto: boolean | string[];
}

export interface ILogar extends DefaultHttpResponse {
    objeto: Login;
}

export interface IVerificarToken extends DefaultHttpResponse {
    objeto: boolean;
}

export interface IGerarSms extends DefaultHttpResponse {
    objeto: string;
}

export interface IConfirmarCodigo extends DefaultHttpResponse {
    objeto: boolean;
}

export interface IMudarSenha extends DefaultHttpResponse {
    objeto: Login;
}

export interface IListagemUsuario extends DefaultHttpResponse {
    objeto: ListagemUsuario[];
}

export interface IInfoUsuario extends DefaultHttpResponse {
    objeto: Usuario;
}

export interface IAlterarUsuario extends DefaultHttpResponse {
    objeto: boolean;
}

export interface IAdicionarPaciente extends DefaultHttpResponse {
    objeto: number;
}

export interface IExcluirPaciente extends DefaultHttpResponse {
    objeto: boolean;
}

export interface IInfoEndereco extends DefaultHttpResponse {
    objeto: Endereco;
}

export interface IAdicionarUsuario extends DefaultHttpResponse {
    objeto: boolean;
}

export interface IDeletarUsuario extends DefaultHttpResponse {
    objeto: boolean;
}

export interface IListagemConsultoriosUsuario extends DefaultHttpResponse {
    objeto: ListagemConsultoriosUsuario[];
}

export interface IObterConsulta extends DefaultHttpResponse {
    objeto: Array<{
        data: string;
        totalEncaixesPermitidos: number;
        horarios: HorarioConsulta[]
    }>;
}

export interface ICriarBloqueio extends DefaultHttpResponse {
    objeto: boolean;
}

export interface IAlterarBloqueio extends DefaultHttpResponse {
    objeto: boolean;
}

export interface IStatusConsulta extends DefaultHttpResponse {
    objeto: StatusConsulta[];
}

export interface ITiposAtendimento extends DefaultHttpResponse {
    objeto: TiposAtendimento[];
}

export interface IAlterarStatus extends DefaultHttpResponse {
    objeto: boolean;
}

export interface ICriarConsulta extends DefaultHttpResponse {
    objeto: boolean;
}

export interface IObterEspecialidades extends DefaultHttpResponse {
    objeto: Especialidades[];
}

export interface IObterInfoConsulta extends DefaultHttpResponse {
    objeto: InfoConsulta;
}

export interface IAlterarConsulta extends DefaultHttpResponse {
    objeto: boolean;
}

export interface IListagemConsultorio extends DefaultHttpResponse {
    objeto: ListagemConsultorios[];
}

export interface IConsultorio extends DefaultHttpResponse {
    objeto: Consultorio;
}

export interface IEditarConsultorio extends DefaultHttpResponse {
    objeto: boolean;
}

export interface IDeletarConsultorio extends DefaultHttpResponse {
    objeto: boolean;
}

export interface ICriarConsultorio extends DefaultHttpResponse {
    objeto: boolean;
}

export interface IObterAgenda extends DefaultHttpResponse {
    objeto: Agenda[];
}

export interface ICriarAgenda extends DefaultHttpResponse {
    objeto: boolean;
}

export interface IAlterarAgenda extends DefaultHttpResponse {
    objeto: boolean;
}

export interface IDeletarAgenda extends DefaultHttpResponse {
    objeto: boolean;
}

export interface IObterAgendaID extends DefaultHttpResponse {
    objeto: Agenda;
}

export interface IObterBloqueios extends DefaultHttpResponse {
    objeto: ListagemBloqueio[];
}

export interface IRemoverBloqueios extends DefaultHttpResponse {
    objeto: boolean;
}

export interface IObterListagemEspecialidades extends DefaultHttpResponse {
    objeto: Especialidades[];
}

export interface IObterAnamnese extends DefaultHttpResponse {
    objeto: Anamnese;
}

export interface ICriarAnamnese extends DefaultHttpResponse {
    objeto: boolean;
}

export interface IAlterarAnamnese extends DefaultHttpResponse {
    objeto: boolean;
}

export interface ICriarDocumento extends DefaultHttpResponse {
    objeto: boolean;
}

export interface IEditarDocumento extends DefaultHttpResponse {
    objeto: boolean;
}

export interface IListarDocumento extends DefaultHttpResponse {
    objeto: ListagemDocumentos[];
}

export interface IObterAnamnese extends DefaultHttpResponse {
    objeto: Anamnese;
}

export interface IObterDocumentoFormatado extends DefaultHttpResponse {
    objeto: string;
}

export interface ICriarTemplateConsulta extends DefaultHttpResponse {
    objeto: boolean;
}

export interface IRegistrarAnamnese extends DefaultHttpResponse {
    objeto: boolean;
}

export interface IObterConsultaMedico extends DefaultHttpResponse {
    objeto: ConsultaAtendimento;
}

export interface IRemoverTemplateConsulta extends DefaultHttpResponse {
    objeto: boolean;
}

export interface IGraficoInformacoesSistema extends DefaultHttpResponse {
    objeto: {
        totalPacientes: number,
        totalConsultas: number,
        totalMedicos: number,
        totalRecepcionista: number,
        totalDiasAtendimento: number,
        totalConsultorios: number,
        totalArrecadado: number
    };
}

export interface ITiposPacientesConsultorios extends DefaultHttpResponse {
    objeto: {
        nomeConsultorio: string,
        totalPacientesNovos: number,
        totalPacientesFrequentes: number
    }[];
}

export interface IArrecadacaoPorConsultorio extends DefaultHttpResponse {
    objeto: {
        nomeConsultorio: string,
        totalRecebido: number,
        totalConsulta: number
    }[];
}

export interface IDesistenciaPorConsultorio extends DefaultHttpResponse {
    objeto: {
        nomeConsultorio: string,
        total: number
    }[];
}

export interface ICancelamentoPorConsultorio extends DefaultHttpResponse {
    objeto: {
        nomeConsultorio: string,
        total: number
    }[];
}

export interface IAtendimentoPorConsultorio extends DefaultHttpResponse {
    objeto: {
        nomeConsultorio: string,
        totalAtendimento: number
    }[];
}

export interface IFormasPagamentoPorConsultorio extends DefaultHttpResponse {
    objeto: {
        nomeConsultorio: string,
        formasPagamentos: string[]
    }[];
}

export interface ListagemDocumentos {
    id: number;
    idMedico: number;
    tipoTemplate: number;
    textoHtml: string;
    dataCadastro: string;
    ativo: boolean;
    nome: string;
}

export interface Anamnese {
    id: number;
    idMedico: number;
    queixaPrincipal: boolean;
    hda: boolean;
    hpp: boolean;
    historicoFamiliar: boolean;
    observacoes: boolean;
    informarcoesGerais: boolean;
    cabecaPescoco: boolean;
    torax: boolean;
    mmss: boolean;
    abdome: boolean;
    mmii: boolean;
    informacoesGeraisFisico: boolean;
    auscultaPulmonar: boolean;
    auscultaCardiaca: boolean;
    informacoesGeraisCardioRespiratório: boolean;
    pa: boolean;
    fc: boolean;
    fr: boolean;
    tax: boolean;
    informacoesGeraisVitais: boolean;
    pesoAltura: boolean;
    obsFinais: boolean;
    cd: boolean;
    informacoesGeraisAntropometrico: boolean;
    informacoesGeraisExames: boolean;
    informacoesGeraisDiagnostico: boolean;
    motivo: boolean;
    cid: boolean;
    resumoAtendimento: boolean;
    tipoDoenca: boolean;
}

export interface Especialidades {
    id: number;
    nome: string;
    descricao: string;
}

export interface TiposAtendimento {
    id: number;
    nome: string;
    descricao: string;
    codigo: string;
    cor: string;
}

export interface StatusConsulta {
    id: number;
    nome: string;
    ordem: number;
    codigo: string;
    descricao: string;
    cor: string;
}

export interface HorarioConsulta {
    hora: string;
    bloqueado: boolean;
    observacaoBloqueio: string;
    consulta: string;
}

export interface Endereco {
    cep: string;
    logradouro: string;
    complemento: string;
    bairro: string;
    localidade: string;
    uf: string;
    unidade: string;
    ibge: string;
    gia: string;
    municipio: string;
}

export interface Login {
    id: number;
    nome: string;
    cpf: string;
    ehMedico: boolean;
    crm: string;
    celular: string;
    telefone: string;
    email: string;
    urlFoto: string;
    ehAdministrador: boolean;
    dataNascimento: string;
    dataCadastro: string;
    dataDesativacao: string;
    token: string;
    codigoSms: string;
    nuncaConfirmouSms: boolean;
    ativo: boolean;
}

export interface ListagemPacientes {
    id: number;
    nome: string;
    cpf: string;
    celular: string;
    email: string;
    dataNascimento: string;
    dataDesativacao: string;
    ativo: boolean;
}

export interface Paciente {
    id: number;
    nome: string;
    cpf: string;
    celular: string;
    telefone: string;
    observacao: string;
    email: string;
    sexo: string;
    urlFoto: string;
    cep: string;
    logradouro: string;
    numero: string;
    complemento: string;
    bairro: string;
    cidade: string;
    estado: string;
    dataNascimento: string;
    dataCadastro: string;
    dataDesativacao: string;
    ativo: boolean;
    consultas: Array<Consulta>;
    comoConheceu: number;
}

export interface Consulta {
    data: string;
    hora: string;
    medico: string;
    consultorio: string;
    urlFotoConsultorio: string;
    formaPagamento: string;
    valor: string;
    especialidade: string;
    consultaAnamnese: Anamnese;
    statusConsulta: string;
    codigoStatusConsulta: string;
    tipoConsulta: string;
    consultasTemplatesDocumentos: Array<ConsultasTemplatesDocumentos> | Array<{titulo: number, templates: Array<ConsultasTemplatesDocumentos>}>;
}

export interface ListagemUsuario {
    id: number;
    nome: string;
    ehMedico: boolean;
    urlFoto: string;
    ehAdministrador: boolean;
    dataDesativacao: string;
    ativo: boolean;
}

export interface ListagemConsultoriosUsuario {
    idConsultorio: number;
    diaSemana: number;
    horaInicio: string;
    horaFim: string;
    nome: string;
    duracaoMinutos: number;
    urlFoto: string;
}

export interface ListagemConsultorios {
    id: number;
    nome: string;
    urlFoto: string;
    cep: string;
    logradouro: string;
    numero: string;
    complemento: string;
    bairro: string;
    cidade: string;
    estado: string;
    telefone1: string;
    telefone2: string;
    celular1: string;
    celular2: string;
    dataCadastro: string;
    dataDesativacao: string;
    ativo: boolean;
}

export interface Usuario {
    id: number;
    nome: string;
    cpf: string;
    ehMedico: boolean;
    crm: string;
    celular: string;
    telefone: string;
    email: string;
    urlFoto: string;
    ehAdministrador: boolean;
    dataNascimento: string;
    dataCadastro: string;
    dataDesativacao: string;
    ativo: boolean;
    ehFinanceiro: boolean;
    ehRecepcionista: boolean;
}

export interface InfoConsulta {
    id: number;
    idPaciente: number;
    idUsuario: number;
    idConsultorio: number;
    idEspecialidade: number;
    idTipoConsulta: number;
    idStatusConsulta: number;
    data: string;
    hora: string;
    observacao: string;
    ehEncaixe: boolean;
    dataCadastro: string;
    valor: number;
    consultorio: Consultorio;
    especialidade: Especialidades;
    paciente: Paciente;
    statusConsulta: StatusConsulta;
    tipoConsulta: TiposAtendimento;
    usuario: Usuario;
}

export interface Consultorio {
    id: number;
    nome: string;
    urlFoto: string;
    cep: string;
    logradouro: string;
    numero: string;
    complemento: string;
    bairro: string;
    cidade: string;
    estado: string;
    telefone1: string;
    telefone2: string;
    celular1: string;
    celular2: string;
    dataCadastro: string;
    dataDesativacao: string;
    ativo: boolean;
}

export interface Agenda {
    id: number;
    idUsuario: number;
    idEspecialidade: number;
    idConsultorio: number;
    diaSemana: number;
    horaInicio: string;
    horaFim: string;
    duracaoMinutos: number;
    dataCadastro: string;
    dataDesativacao: string;
    totalLimiteEncaixe: number;
    ativo: boolean;
    datas: any;
    horas: any;
    consultorio: Consultorio;
    dataVigenciaInicio: string;
    dataVigenciaFim: string;
    usuariosConsultoriosEspecialidades: Array<{
        id: number;
        idEspecialidade: number;
        idUsuarioConsultorio: number;
        especialidade: {
            id: number;
            nome: string;
            descricao: string
        }
    }>;
    usuario: Usuario;
}

export interface ListagemBloqueio {
    id: number;
    medico: string;
    consultorio: string;
    usuarioCriador: string;
    dataInicio: string;
    dataFim: string;
    observacao: string;
    dataCadastro: string;
    ativo: boolean;
    datas: any;
    idConsultorio: number;
    urlFotoConsultorio: string;
}

export interface ConsultaAtendimento {
    id: number;
    idPaciente: number;
    idUsuario: number;
    idConsultorio: number;
    idEspecialidade: number;
    idTipoConsulta: number;
    idStatusConsulta: number;
    dataStatusConsulta: string;
    data: string;
    hora: string;
    observacao: string;
    ehEncaixe: boolean;
    dataCadastro: string;
    valor: number;
    consultorio: Consultorio;
    especialidade: Especialidades;
    paciente: Paciente;
    statusConsulta: StatusConsulta;
    tipoConsulta: TiposAtendimento;
    usuario: Usuario;
    consultaAnamnese: Anamnese;
    consultasTemplatesDocumentos: Array<ConsultasTemplatesDocumentos>;
}

export interface ConsultasTemplatesDocumentos {
    id: number;
    idConsulta: number;
    tipoTemplate: number;
    textoHtml: string;
    dataCadastro: string;
}
