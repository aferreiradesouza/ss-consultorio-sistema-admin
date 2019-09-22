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
    objeto: Paciente;
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

export interface IObterConsulta extends DefaultHttpResponse {
    objeto: Array<{
        data: string;
        totalEncaixesPermitidos: number;
        horarios: HorarioConsulta[]
    }>;
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
    ativo: true;
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
