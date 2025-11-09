import { ItemSaidaDTO } from "./ItemSaidaDTO.model";

export interface PostSaidaDTO {

    // Propriedades
    motivoMovimentacaoId: number;
    funcionarioId: number;
    cadastroCliente?: string; // opcional
    valorTotal: number;
    desconto: boolean;
    valorDesconto?: number; // obrigatório apenas quando desconto = true
    valorFinal: number;
    itemSaida: ItemSaidaDTO[];
}