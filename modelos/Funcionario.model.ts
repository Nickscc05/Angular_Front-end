export interface Funcionario {

    // Propriedades
    id: number;
    nome: string;
    cpf: string;
    rg: string;
    telefone: string;
    telefoneExtra: string;
    email: string;
    contaBancaria: string;
    agenciaBancaria: string;
    ativo: boolean;

    // Relacionamentos
    // saida?: Saida[];
}