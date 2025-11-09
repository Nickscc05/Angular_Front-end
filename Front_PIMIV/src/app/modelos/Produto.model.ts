export interface Produto {

    // Propriedades
    id: number;
    nome: string;
    descricao: string;
    codigo: string;
    preco: number;
    quantidadeAtual: number;
    quantidadeMinima: number;
    ativo: boolean;
    categoriaId: number;
    unidadeMedidaId: number;

    // Relacionamentos
    // categoria?: Categoria;
    // unidadeMedida?: UnidadeMedida;
    // historicoProduto?: HistoricoProduto[];
    // itemEntrada?: ItemEntrada[];
    // itemSaida?: ItemSaida[];
    // fornecedorProduto?: FornecedorProduto[];
}
