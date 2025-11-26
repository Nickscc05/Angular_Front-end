export interface GetHistoricoProdutoDTO {
  id: number;
  produtoId: number;
  precoProduto: number;
  dataAlteracao: string; // Format: 'YYYY-MM-DD'
}