export interface PostFuncionarioDTO {

    // Propriedades
    cpf: string;
    rg: string;
    nome: string;
    telefone: string;
    telefoneExtra?: string; // opcional
    email: string;
    contaBancaria: string;
    agenciaBancaria: string;
}