export interface Fornecedor {
    
    // Propriedades
    id: number;
    nomeFantasia: string;
    cadastroPessoa: string;
    telefone: string;
    telefoneExtra: string;
    email: string;
    ativo: boolean;
    dataRegistro: string;

    // Relacionamentos
    // entrada?: Entrada[];
    // fornecedorProduto?: FornecedorProduto[];
}
