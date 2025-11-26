import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MotivoMovimentacaoService } from '../../servicos/motivo-movimentacao/motivo-movimentacao.service';
import { MotivoMovimentacao } from '../../modelos/MotivoMovimentacao/MotivoMovimentacao.model';
import { PostMotivoMovimentacaoDTO } from '../../modelos/DTO/MotivoMovimentacao/PostMotivoMovimentacaoDTO.model';
import { finalize } from 'rxjs';
import { ErrorHandlerService } from '../../servicos/shared/error-handler.service';
import { NotificationService } from '../../servicos/shared/notification.service';

@Component({
  selector: 'app-motivo-movimentacao',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './motivo-movimentacao.component.html',
  styleUrls: ['./motivo-movimentacao.component.css'],
})

export class MotivoMovimentacaoComponent implements OnInit {

  listaMotivos: MotivoMovimentacao[] = [];
  novoMotivoNome = '';
  enviando = false;
  editandoId: number | null = null;

  constructor(
    private motivoMovimentacaoService: MotivoMovimentacaoService,
    private errorHandler: ErrorHandlerService,
    private notification: NotificationService
  ) { }

  ngOnInit(): void {
    this.obterMotivos();
  }

  private obterMotivos(): void {
    this.motivoMovimentacaoService.obterTodos().subscribe({
      next: (motivos) => { this.listaMotivos = motivos; },
      error: (erro) => {
        console.error('Erro ao obter motivos:', erro);
        this.notification.erro(this.errorHandler.extrairMensagemErro(erro, 'Erro ao carregar motivos.'));
      }
    });
  }

  onSubmit(): void {
    const nome = this.novoMotivoNome?.trim();
    if (!nome || this.enviando) return;

    this.enviando = true;
    const finalizar = () => {
      this.enviando = false;
    };

    if (this.editandoId != null) {
      this.motivoMovimentacaoService
        .atualizar(this.editandoId, { id: this.editandoId, motivo: nome })
        .pipe(finalize(finalizar))
        .subscribe({
          next: () => {
            this.obterMotivos();
            this.cancelarEdicao();
            this.notification.sucesso('Motivo atualizado com sucesso.');
          },
          error: (erro) => {
            console.error('Erro ao atualizar motivo:', erro);
            this.notification.erro(this.errorHandler.extrairMensagemErro(erro, 'Erro ao atualizar motivo.'));
          }
        });
    } else {
      const dto: PostMotivoMovimentacaoDTO = { motivo: nome };
      this.motivoMovimentacaoService
        .criar(dto)
        .pipe(finalize(finalizar))
        .subscribe({
          next: () => {
            this.obterMotivos();
            this.novoMotivoNome = '';
            this.notification.sucesso('Motivo criado com sucesso.');
          },
          error: (erro) => {
            console.error('Erro ao criar motivo:', erro);
            this.notification.erro(this.errorHandler.extrairMensagemErro(erro, 'Erro ao criar motivo.'));
          }
        });
    }
  }
  
  iniciarEdicao(motivo: MotivoMovimentacao): void {
    if (this.enviando) return;
    this.editandoId = motivo.id;
    this.novoMotivoNome = motivo.motivo;
  }

  cancelarEdicao(): void {
    this.editandoId = null;
    this.novoMotivoNome = '';
  }

  excluir(id: number): void {
    if (this.enviando) return;
    if (!confirm('Tem certeza que deseja excluir este motivo?')) return;

    this.enviando = true;
    this.motivoMovimentacaoService.deletar(id)
      .pipe(finalize(() => this.enviando = false))
      .subscribe({
        next: () => {
          this.obterMotivos();
          this.notification.sucesso('Motivo excluído com sucesso.');
        },
        error: (erro) => {
          console.error('Erro ao excluir motivo:', erro);
          this.notification.erro(this.errorHandler.extrairMensagemErro(erro, 'Erro ao excluir motivo.'));
        }
      });
  }
}
