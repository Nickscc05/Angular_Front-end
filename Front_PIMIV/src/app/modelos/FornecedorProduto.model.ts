export interface FornecedorProduto {

    // Propriedades
    id: number;
    fornecedorId: number;
    produtoId: number;
    codigoFornecedor: string;
    disponibilidade: boolean;
    dataRegistro: string;

    // Relacionamentos
    // fornecedor?: Fornecedor;
    // produto?: Produto;
}