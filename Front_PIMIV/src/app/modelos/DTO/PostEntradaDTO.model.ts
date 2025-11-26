import { ItemEntradaDTO } from "../ItemEntrada/ItemEntradaDTO.model";

export interface PostEntradaDTO {

    // Propriedades
    fornecedorId: number;
    motivoMovimentacaoId: number;
    precoTotal: number;
    dataCompra: string; // DateOnly -> 'YYYY-MM-DD'
    numeroNota: string;
    itemEntrada: ItemEntradaDTO[];
}