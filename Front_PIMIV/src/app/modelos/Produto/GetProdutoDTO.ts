import { GetCategoriaDTO } from "../Categoria/GetCategoriaDTO";
import { GetUnidadeMedidaDTO } from "../UnidadeMedida/GetUnidadeMedidaDTO";

export interface GetProdutoDTO {

  id: number;
  nome: string;
  codigo: string;
  preco: number;
  descricao?: string;
  categoriaId: number;
  quantidadeAtual: number;
  quantidadeMinima: number;
  ativo: boolean;
  
  categoria?: GetCategoriaDTO;
  unidadeMedida?: GetUnidadeMedidaDTO;
}