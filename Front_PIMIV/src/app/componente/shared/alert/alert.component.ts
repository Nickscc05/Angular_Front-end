import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService, Notificacao } from '../../../servicos/shared/notification.service';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="notificacao" class="alert-container">
      <div class="alert"
           [class.alert-success]="notificacao.tipo === 'sucesso'"
           [class.alert-error]="notificacao.tipo === 'erro'"
           [class.alert-info]="notificacao.tipo === 'info'">
        <span class="message">{{ notificacao.mensagem }}</span>
        <button class="close-btn" (click)="fechar()">&times;</button>
      </div>
    </div>
  `,
  styles: [`
    .alert-container {
      position: fixed;
      top: 80px; /* Ajustar conforme a altura do header */
      right: 20px;
      z-index: 1000;
      max-width: 400px;
      width: 100%;
      animation: slideIn 0.3s ease-out;
    }

    .alert {
      padding: 15px;
      border-radius: 4px;
      color: white;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      font-family: 'Poppins', sans-serif;
    }

    .alert-success {
      background-color: #41f1b6; /* Primary success color from theme */
      color: #fff;
    }

    .alert-error {
      background-color: #ff7782; /* Danger color from theme */
      color: #fff;
    }

    .alert-info {
      background-color: #7380ec; /* Primary color from theme */
      color: #fff;
    }

    .message {
      margin-right: 10px;
      font-size: 0.9rem;
    }

    .close-btn {
      background: none;
      border: none;
      color: white;
      font-size: 1.2rem;
      cursor: pointer;
      font-weight: bold;
    }

    @keyframes slideIn {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
  `]
})
export class AlertComponent implements OnInit {
  notificacao: Notificacao | null = null;

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.notificationService.notificacao$.subscribe(n => {
      this.notificacao = n;
    });
  }

  fechar(): void {
    this.notificationService.limpar();
  }
}
