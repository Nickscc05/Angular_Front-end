export interface PutFuncionarioDTO {
    
    // Propriedades
    Id: number;
    cpf: string;
    rg: string;
    nome: string;
    telefone: string;
    telefoneExtra?: string; // opcional
    email: string;
    contaBancaria: string;
    agenciaBancaria: string; // 4 caracteres no backend, mas string aqui
    ativo: boolean;
}