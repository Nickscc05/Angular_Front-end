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
  
  notificacao: Notificacao | null = null;
  slideOut = false;
  private closeTimeout: any;
  private autoCloseTimeout: any;

  constructor(private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.notificationService.notificacao$.subscribe(n => {
      this.notificacao = n;
      
      if (this.autoCloseTimeout) {
        clearTimeout(this.autoCloseTimeout);
        this.autoCloseTimeout = null;
      }

      if (n) {
        this.slideOut = false;
        if (n.tempo && n.tempo > 0) {
          this.autoCloseTimeout = setTimeout(() => {
            this.fechar();
          }, n.tempo);
        }
      }
    });
  }

  fechar(): void {
    if (this.slideOut) return;
    
    if (this.autoCloseTimeout) {
      clearTimeout(this.autoCloseTimeout);
      this.autoCloseTimeout = null;
    }

    this.slideOut = true;
    clearTimeout(this.closeTimeout);
    this.closeTimeout = setTimeout(() => {
      this.notificationService.limpar();
    }, 400); // tempo igual ao transition do CSS
  }
}
