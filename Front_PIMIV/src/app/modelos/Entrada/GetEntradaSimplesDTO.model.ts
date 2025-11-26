export interface GetEntradaSimplesDTO {
  
  id: number;
  nomeFantasiaFornecedor: string;
  motivo: string;
  precoTotal: number;
  dataCompra: string; // Format: 'YYYY-MM-DD'
}