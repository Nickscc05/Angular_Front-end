import { ItemEntrada } from "../ItemEntrada/ItemEntrada.model";

export interface Entrada {
    
    id: number;
    numeroNota?: string;
    nomeFantasiaFornecedor: string;
    motivoMovimentacaoId: number;
    motivo: string;
    precoTotal: number;
    dataCompra: string; // Format: 'YYYY-MM-DD'
    itens: ItemEntrada[];
}