export interface Entrada {

    // Propriedades
    id: number;
    dataCompra: string;
    fornecedorId: number;
    motivoMovimentacaoId: number;
    numeroNota: string;
    precoTotal: number;

    // Relacionamentos
    // fornecedor?: Fornecedor;
    // motivoMovimentacao?: MotivoMovimentacao;
    // itemEntrada?: ItemEntrada[];
}