import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UnidadeMedidaService } from '../../servicos/unidade-medida/unidade-medida.service.service';
import { UnidadeMedida } from '../../modelos/UnidadeMedida/UnidadeMedida.model';
import { PostUnidadeMedidaDTO } from '../../modelos/DTO/PostUnidadeMedidaDTO.model';
import { PutUnidadeMedidaDTO } from '../../modelos/DTO/PutUnidadeMedidaDTO.model';
import { finalize } from 'rxjs';
import { ErrorHandlerService } from '../../servicos/shared/error-handler.service';
import { NotificationService } from '../../servicos/shared/notification.service';

@Component({
  selector: 'app-unidade-medida',
  imports: [CommonModule, FormsModule],
  templateUrl: './unidade-medida.component.html',
  styleUrls: ['./unidade-medida.component.css'],
  standalone: true
})

export class UnidadeMedidaComponent implements OnInit {

  listaUnidades: UnidadeMedida[] = [];
  novaUnidadeNome = '';
  novaUnidadeAbreviacao = '';
  enviando = false;
  editandoId: number | null = null;

  constructor(
    private unidadeService: UnidadeMedidaService,
    private errorHandler: ErrorHandlerService,
    private notification: NotificationService
  ) { }

  ngOnInit(): void {
    this.obterUnidades();
  }

  private obterUnidades(): void {
    this.unidadeService.obterTodas().subscribe({
      next: (unidades) => { this.listaUnidades = unidades; },
      error: (erro) => {
        console.error('Erro ao obter unidades de medida:', erro);
        this.notification.erro(this.errorHandler.extrairMensagemErro(erro, 'Erro ao carregar unidades de medida.'));
      }
    });
  }

  onSubmit(): void {
    const nome = this.novaUnidadeNome?.trim();
    const abreviacao = this.novaUnidadeAbreviacao?.trim();
    
    if (!nome || !abreviacao || this.enviando) return;

    this.enviando = true;
    const finalizar = () => {
      this.enviando = false;
    };

    if (this.editandoId != null) {
      const dto: PutUnidadeMedidaDTO = { id: this.editandoId, nome, abreviacao };
      this.unidadeService
        .atualizar(this.editandoId, dto)
        .pipe(finalize(finalizar))
        .subscribe({
          next: () => {
            this.obterUnidades();
            this.cancelarEdicao();
            this.notification.sucesso('Unidade de medida atualizada com sucesso.');
          },
          error: (erro) => {
            console.error('Erro ao atualizar unidade de medida:', erro);
            this.notification.erro(this.errorHandler.extrairMensagemErro(erro, 'Erro ao atualizar unidade de medida.'));
          }
        });
    } else {
      const dto: PostUnidadeMedidaDTO = { nome, abreviacao };
      this.unidadeService
        .criar(dto)
        .pipe(finalize(finalizar))
        .subscribe({
          next: () => {
            this.obterUnidades();
            this.novaUnidadeNome = '';
            this.novaUnidadeAbreviacao = '';
            this.notification.sucesso('Unidade de medida criada com sucesso.');
          },
          error: (erro) => {
            console.error('Erro ao criar unidade de medida:', erro);
            this.notification.erro(this.errorHandler.extrairMensagemErro(erro, 'Erro ao criar unidade de medida.'));
          }
        });
    }
  }
  
  iniciarEdicao(unidade: UnidadeMedida): void {
    if (this.enviando) return;
    this.editandoId = unidade.id;
    this.novaUnidadeNome = unidade.nome;
    this.novaUnidadeAbreviacao = unidade.abreviacao;
  }

  cancelarEdicao(): void {
    this.editandoId = null;
    this.novaUnidadeNome = '';
    this.novaUnidadeAbreviacao = '';
  }

  excluir(id: number): void {
    if (this.enviando) return;
    if (!confirm('Tem certeza que deseja excluir esta unidade de medida?')) return;

    this.enviando = true;
    this.unidadeService.deletar(id)
      .pipe(finalize(() => this.enviando = false))
      .subscribe({
        next: () => {
          this.obterUnidades();
          this.notification.sucesso('Unidade de medida excluída com sucesso.');
        },
        error: (erro) => {
          console.error('Erro ao excluir unidade de medida:', erro);
          this.notification.erro(this.errorHandler.extrairMensagemErro(erro, 'Erro ao excluir unidade de medida.'));
        }
      });
  }
}
