import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Notificacao {
  mensagem: string;
  tipo: 'sucesso' | 'erro' | 'info';
  tempo?: number;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private notificacaoSubject = new BehaviorSubject<Notificacao | null>(null);
  notificacao$ = this.notificacaoSubject.asObservable();

  private timeoutId: any;

  constructor() { }

  mostrar(mensagem: string, tipo: 'sucesso' | 'erro' | 'info' = 'info', tempo: number = 5000): void {
    this.limpar();
    this.notificacaoSubject.next({ mensagem, tipo, tempo });
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
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
    this.notificacaoSubject.next(null);
  }
}
