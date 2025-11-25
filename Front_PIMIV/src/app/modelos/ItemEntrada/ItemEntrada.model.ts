export interface ItemEntrada {

    // Propriedades
    id: number;
    entradaId: number;
    produtoId: number;
    lote: string;
    validade: string;
    precoUnitario: number;
    quantidade: number;

    // Relacionamentos
    // entrada?: Entrada;
    // produto?: Produto;
}