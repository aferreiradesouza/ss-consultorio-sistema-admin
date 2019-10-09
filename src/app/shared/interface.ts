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
    ativo: boolean;
    consultorio: Consultorio;
    dataVigenciaInicio: string;
    dataVigenciaFim: string;
    especialidade: Array<{
        id: number,
        idEspecialidade: number,
        idUsuarioConsultorio: number,
        especialidade: {
            id: number,
            nome: string,
            descricao: string
        }
    }>;
    usuario: Usuario;
}
