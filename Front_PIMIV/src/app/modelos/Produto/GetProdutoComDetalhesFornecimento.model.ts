import { GetCategoriaDTO } from "../Categoria/GetCategoriaDTO";
import { GetUnidadeMedidaDTO } from "../UnidadeMedida/GetUnidadeMedidaDTO";

export interface GetProdutoComDetalhesFornecimentoDTO {

    codigoFornecedor: string;
    dataRegistro: string; // Em TypeScript, datas são geralmente tratadas como string (ISO 8601) ou Date
    disponibilidade: boolean;
    produtoId: number;
    nomeProduto: string;
    descricaoProduto: string;
    codigo: string;
    precoAtual: number;
    categoriaDTO: GetCategoriaDTO;
    unidadeMedidaDTO: GetUnidadeMedidaDTO;
}