export interface ItemEntradaDTO {

    // Propriedades
    produtoId: number;
    quantidade: number; // decimal no backend
    lote?: string;
    validade?: string; // ex: '2025-12-31' (ISO)
    precoUnitario: number;
}