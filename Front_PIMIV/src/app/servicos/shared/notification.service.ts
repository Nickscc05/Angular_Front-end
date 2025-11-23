import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Notificacao {
  id: number;
  mensagem: string;
  tipo: 'sucesso' | 'erro' | 'info';
  tempo?: number;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private notificacoesSubject = new BehaviorSubject<Notificacao[]>([]);
  notificacoes$ = this.notificacoesSubject.asObservable();
  private currentId = 0;

  constructor() { }

  mostrar(mensagem: string, tipo: 'sucesso' | 'erro' | 'info' = 'info', tempo: number = 5000): void {
    const novaNotificacao: Notificacao = {
      id: ++this.currentId,
      mensagem,
      tipo,
      tempo
    };

    const atuais = this.notificacoesSubject.value;
    this.notificacoesSubject.next([...atuais, novaNotificacao]);
  }

  remover(id: number): void {
    const atuais = this.notificacoesSubject.value;
    this.notificacoesSubject.next(atuais.filter(n => n.id !== id));
  }

  sucesso(mensagem: string, tempo: number = 5000): void {
    this.mostrar(mensagem, 'sucesso', tempo);
  }

  erro(mensagem: string, tempo: number = 5000): void {
    this.mostrar(mensagem, 'erro', tempo);
  }

  info(mensagem: string, tempo: number = 5000): void {
    this.mostrar(mensagem, 'info', tempo);
  }

  limpar(): void {
    this.notificacoesSubject.next([]);
  }
}
