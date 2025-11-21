import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor() { }

  extrairMensagemErro(erro: unknown, fallback: string = 'Ocorreu um erro inesperado.'): string {
    if (typeof erro === 'string' && erro.trim()) {
      return erro;
    }

    const httpErro = erro as { error?: unknown; message?: string; status?: number } | null | undefined;

    // Tenta pegar a mensagem do corpo do erro (ex: BadRequest com mensagem customizada)
    const detalhe = httpErro?.error as { message?: string; detail?: string; errors?: any } | string | undefined;

    if (typeof detalhe === 'string' && detalhe.trim()) {
      return detalhe;
    }

    if (typeof detalhe === 'object' && detalhe) {
      const info = detalhe as { message?: string; detail?: string };
      const mensagem = info.message ?? info.detail;
      if (mensagem && mensagem.trim()) {
        return mensagem;
      }

      // Tratamento para validações do ASP.NET (errors: { Field: ["Error"] })
      const errosValidacao = (detalhe as any).errors;
      if (errosValidacao) {
        const mensagens = Object.values(errosValidacao).flat();
        if (mensagens.length > 0) {
          return mensagens[0] as string;
        }
      }
    }

    // Mensagem genérica do HttpErrorResponse
    if (httpErro?.message && httpErro.message.trim()) {
      return httpErro.message;
    }

    return fallback;
  }
}
