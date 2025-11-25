export interface ItemEntradaDTO {

    produtoId: number;
    quantidade: number;
    lote?: string;
    validade?: string;
    precoUnitario: number;
    codigoFornecedor: string;
}