export interface GetFornecedorProdutoDTO {
  fornecedorId: number;
  produtoId: number;
  codigoFornecedor: string;
  dataRegistro: string; // Representado como string, mas pode ser convertido para Date
  disponibilidade: boolean;
}