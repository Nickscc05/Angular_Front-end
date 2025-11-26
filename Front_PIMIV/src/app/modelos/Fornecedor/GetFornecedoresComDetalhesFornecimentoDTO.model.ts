export interface GetFornecedoresComDetalhesFornecimentoDTO {
    nomeFantasia: string;
    telefone: string;
    telefoneExtra?: string;
    email: string;
    ativo: boolean;
    codigoFornecedor: string;
    disponibilidade: boolean;
}