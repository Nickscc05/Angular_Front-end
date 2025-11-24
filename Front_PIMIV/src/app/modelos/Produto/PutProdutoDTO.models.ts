export interface PutProdutoDTO {

    idProduto: number;
    nome: string;
    codigo: string;
    categoriaId: number;
    unidadeMedidaId: number;
    preco: number;
    quantidadeMinima: number;
    descricao?: string;
    ativo: boolean;
}