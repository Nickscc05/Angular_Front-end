import { ItemEntradaDTO } from "../DTO/ItemEntradaDTO.model";

export interface PostEntrada {

  fornecedorId: number;
  motivoMovimentacaoId: number;
  precoTotal: number;
  dataCompra: string; // Format: 'YYYY-MM-DD'
  numeroNota?: string;
  itemEntrada: ItemEntradaDTO[];
}