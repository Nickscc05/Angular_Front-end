export interface GetFornecedorDTO {

    id: number;
    nome: string;
    cadastroPessoa: string;
    telefone: string;
    telefoneExtra?: string;
    email: string;
    dataRegistro: string; // Em TypeScript, datas são geralmente tratadas como string (ISO 8601) ou Date
    ativo: boolean;
}