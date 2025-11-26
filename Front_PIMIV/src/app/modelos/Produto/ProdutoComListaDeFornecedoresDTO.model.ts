import { GetCategoriaDTO } from "../Categoria/GetCategoriaDTO";
import { GetFornecedoresComDetalhesFornecimentoDTO } from "../Fornecedor/GetFornecedoresComDetalhesFornecimentoDTO.model";
import { GetUnidadeMedidaDTO } from "../UnidadeMedida/GetUnidadeMedidaDTO";

export interface ProdutoComListaDeFornecedoresDTO {
  nome: string;
  codigo: string;
  preco: number;
  quantidadeAtual: number;
  quantidadeMinima: number;
  categoria?: GetCategoriaDTO;
  unidadeMedida?: GetUnidadeMedidaDTO;
  fornecedores: GetFornecedoresComDetalhesFornecimentoDTO[];
}