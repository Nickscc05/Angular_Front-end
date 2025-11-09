export interface Saida {

    // Propriedades
    id: number;
    funcionarioId: number;
    motivoMovimentacaoId: number;
    cadastroCliente: string;
    dataSaida: string;
    horaSaida: string;
    desconto: boolean;
    valorDesconto: number;
    valorFinal: number;
    valorTotal: number;

    // Relacionamentos
    // funcionario?: Funcionario;
    // motivoMovimentacao?: MotivoMovimentacao;
    // itemSaida?: ItemSaida[];
}