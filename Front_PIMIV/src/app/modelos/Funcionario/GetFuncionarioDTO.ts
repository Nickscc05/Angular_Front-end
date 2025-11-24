export interface GetFuncionarioDTO {
    id: number;
    nome: string;
    cpf: string;
    rg: string;
    telefone: string;
    telefoneExtra?: string;
    email: string;
    contaBancaria: string;
    agenciaBancaria: string;
    ativo: boolean;
}
