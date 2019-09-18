export interface ListagemPacientes {
    mensagens: string[];
    objeto: Array<{
        id: number;
        nome: string;
        celular: string;
        email: string;
        dataNascimento: string;
        dataDesativacao: string;
        ativo: true
    }>;
    autorizado: boolean;
    codigo: string;
    tempoLevado: string;
    sucesso: boolean;
}

export interface Paciente {
    mensagens: string[];
    objeto: {
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
        consultas: Array<Consulta>
    };
    autorizado: boolean;
    codigo: string;
    tempoLevado: string;
    sucesso: boolean;
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
