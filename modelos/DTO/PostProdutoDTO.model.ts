export interface PostProdutoDTO {

    // Propriedades
    categoriaId: number;
    unidadeMedidaId: number;
    nome: string;
    codigo: string;
    descricao?: string; // opcional
    preco: number;
    quantidadeMinima: number;
}