import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService, Notificacao } from '../../../servicos/shared/notification.service';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})

export class AlertComponent implements OnInit {
  
  notificacoes: (Notificacao & { closing?: boolean, timeoutId?: any })[] = [];

  constructor(private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.notificationService.notificacoes$.subscribe(listaDoServico => {
      // Adicionar novos
      listaDoServico.forEach(n => {
        const existente = this.notificacoes.find(local => local.id === n.id);
        if (!existente) {
          const novo: any = { ...n, closing: false };
          if (n.tempo && n.tempo > 0) {
            novo.timeoutId = setTimeout(() => this.fechar(novo), n.tempo);
          }
          this.notificacoes.push(novo);
        }
      });

      // Remover os que não estão mais no serviço
      this.notificacoes = this.notificacoes.filter(local => 
        listaDoServico.some(servico => servico.id === local.id)
      );
    });
  }

  fechar(notificacao: any): void {
    if (notificacao.closing) return;
    
    notificacao.closing = true;
    if (notificacao.timeoutId) clearTimeout(notificacao.timeoutId);

    setTimeout(() => {
      this.notificationService.remover(notificacao.id);
    }, 400); // tempo igual ao transition do CSS
  }
}
