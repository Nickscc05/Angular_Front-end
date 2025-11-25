export interface GetEntradaSimples {
  
  id: number;
  nomeFantasiaFornecedor: string;
  motivo: string;
  precoTotal: number;
  dataCompra: string; // Format: 'YYYY-MM-DD'
}