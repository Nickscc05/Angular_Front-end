import { GetProdutoComDetalhesFornecimentoDTO } from "../Produto/GetProdutoComDetalhesFornecimento.model";

export interface FornecedorComListaProdutosDTO {
    
  id: number;
  nomeFantasia: string;
  cadastroPessoa: string;
  telefone: string;
  telefoneExtra?: string;
  email: string;
  produtos: GetProdutoComDetalhesFornecimentoDTO[];
}