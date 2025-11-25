import { ItemEntradaDTO } from "../DTO/ItemEntradaDTO.model";

export interface GetEntradaDTO {

  id: number;
  numeroNota?: string;
  nomeFantasiaFornecedor: string;
  motivoMovimentacaoId: number;
  motivo: string;
  precoTotal: number;
  dataCompra: string; // Format: 'YYYY-MM-DD'
  itens: ItemEntradaDTO[];
}