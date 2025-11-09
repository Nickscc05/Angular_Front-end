Interfaces em TS:

export interface Categoria {
  id: number;
  nome: string;
  // produto?: Produto[];
}

export interface Entrada {
  id: number;
  dataCompra: string;
  fornecedorId: number;
  motivoMovimentacaoId: number;
  numeroNota: string;
  precoTotal: number;
  // fornecedor?: Fornecedor;
  // motivoMovimentacao?: MotivoMovimentacao;
  // itemEntrada?: ItemEntrada[];
}

export interface Fornecedor {
  id: number;
  nomeFantasia: string;
  cadastroPessoa: string;
  telefone: string;
  telefoneExtra: string;
  email: string;
  ativo: boolean;
  dataRegistro: string;
  // entrada?: Entrada[];
  // fornecedorProduto?: FornecedorProduto[];
}

export interface FornecedorProduto {
  fornecedorId: number;
  produtoId: number;
  codigoFornecedor: string;
  disponibilidade: boolean;
  dataRegistro: string;
  // fornecedor?: Fornecedor;
  // produto?: Produto;
}

export interface Funcionario {
  id: number;
  nome: string;
  cpf: string;
  rg: string;
  telefone: string;
  telefoneExtra: string;
  email: string;
  contaBancaria: string;
  agenciaBancaria: string;
  ativo: boolean;
  // saida?: Saida[];
}

export interface HistoricoProduto {
  id: number;
  produtoId: number;
  precoProduto: number;
  dataAlteracao: string;
  // produto?: Produto;
}

export interface ItemEntrada {
  id: number;
  entradaId: number;
  produtoId: number;
  lote: string;
  precoUnitario: number;
  quantidade: number;
  validade: string;
  // entrada?: Entrada;
  // produto?: Produto;
}

export interface ItemSaida {
  id: number;
  produtoId: number;
  saidaId: number;
  quantidade: number;
  valor: number;
  // produto?: Produto;
  // saida?: Saida;
}

export interface MotivoMovimentacao {
  id: number;
  tipoMovimentacao: string;
  ativo: boolean;
  // entrada?: Entrada[];
  // saida?: Saida[];
}

export interface Produto {
  id: number;
  nome: string;
  descricao: string;
  codigo: string;
  preco: number;
  quantidadeAtual: number;
  quantidadeMinima: number;
  ativo: boolean;
  categoriaId: number;
  unidadeMedidaId: number;
  // categoria?: Categoria;
  // unidadeMedida?: UnidadeMedida;
  // historicoProduto?: HistoricoProduto[];
  // itemEntrada?: ItemEntrada[];
  // itemSaida?: ItemSaida[];
  // fornecedorProduto?: FornecedorProduto[];
}

export interface Saida {
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
  // funcionario?: Funcionario;
  // motivoMovimentacao?: MotivoMovimentacao;
  // itemSaida?: ItemSaida[];
}

export interface UnidadeMedida {
  id: number;
  nome: string;
  abreviacao: string;
  // produto?: Produto[];
}

--------------------------------------------------------------##############################################################--------------------------------------------------------------

// Interfaces DTO

// Categoria
export interface PostCategoriaDTO {
  nome: string;
}

// Unidade de Medida
export interface PostUnidadeMedidaDTO {
  nome: string;
  abreviacao: string;
}

// Fornecedor
export interface PostFornecedorDTO {
  nomeFantasia: string;
  cadastroPessoa: string;
  telefone: string;
  telefoneExtra?: string; // opcional
  email: string;
}

// Produto
export interface PostProdutoDTO {
  categoriaId: number;
  unidadeMedidaId: number;
  nome: string;
  codigo: string;
  descricao?: string; // opcional
  preco: number;
  quantidadeMinima: number;
}

// Fornecedor-Produto
export interface PostFornecedorProdutoDTO {
  fornecedorId: number;
  produtoId: number;
  codigoFornecedor: string;
}

// Funcionário
export interface PostFuncionarioDTO {
  cargoId: number;
  cpf: string;
  rg: string;
  nome: string;
  telefone: string;
  telefoneExtra?: string; // opcional
  email: string;
  contaBancaria: string;
  agenciaBancaria: string; // 4 caracteres no backend, mas string aqui
  ativo: boolean;
}

// Item de Entrada
export interface ItemEntradaDTO {
  produtoId: number;
  quantidade: number; // decimal no backend
  lote?: string;
  validade?: string; // ex: '2025-12-31' (ISO)
  precoUnitario: number;
}

// Entrada
export interface PostEntradaDTO {
  fornecedorId: number;
  motivoMovimentacaoId: number;
  precoTotal: number;
  dataCompra: string; // DateOnly -> 'YYYY-MM-DD'
  numeroNota: string;
  itemEntrada: ItemEntradaDTO[];
}

// Item de Saída
export interface ItemSaidaDTO {
  produtoId: number;
  quantidade: number; // int no backend
  // valor?: number; // se voltar a existir
}

// Saída
export interface PostSaidaDTO {
  motivoMovimentacaoId: number;
  funcionarioId: number;
  cadastroCliente?: string; // opcional
  valorTotal: number;
  desconto: boolean;
  valorDesconto?: number; // obrigatório apenas quando desconto = true
  valorFinal: number;
  itemSaida: ItemSaidaDTO[];
}