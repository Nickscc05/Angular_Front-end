import { ItemEntradaDTO } from "../ItemEntrada/ItemEntradaDTO.model";


export interface PostEntradaDTO {
  
  fornecedorId: number;
  motivoMovimentacaoId: number;
  precoTotal: number;
  dataCompra: string; // Format: 'YYYY-MM-DD'
  numeroNota?: string;
  itemEntrada: ItemEntradaDTO[];
}