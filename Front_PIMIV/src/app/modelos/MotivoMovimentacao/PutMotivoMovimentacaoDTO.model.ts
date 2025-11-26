export interface PutMotivoMovimentacaoDTO {
    id: number; // Included for consistency with service method parameter
    motivo: string;
    ativo: boolean;
}