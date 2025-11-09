export interface ItemSaida {
 
    // Propriedades
    id: number;
    produtoId: number;
    saidaId: number;
    quantidade: number;
    valor: number;

    // Relacionamentos
    // produto?: Produto;
    // saida?: Saida;
}