export interface ItemEntrada {

    // Propriedades
    id: number;
    entradaId: number;
    produtoId: number;
    lote: string;
    precoUnitario: number;
    quantidade: number;
    validade: string;

    // Relacionamentos
    // entrada?: Entrada;
    // produto?: Produto;
}