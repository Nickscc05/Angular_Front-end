export interface PutFornecedorDTO {
    
  id: number;
  nomeFantasia: string;
  cadastroPessoa: string;
  telefone: string;
  telefoneExtra?: string;
  email: string;
  ativo: boolean;
}