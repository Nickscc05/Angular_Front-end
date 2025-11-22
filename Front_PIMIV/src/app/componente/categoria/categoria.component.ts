import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CategoriaService } from '../../servicos/categoria/categoria.service';
import { Categoria } from '../../modelos/Categoria.model';
import { PostCategoriaDTO } from '../../modelos/DTO/PostCategoriaDTO.model';
import { finalize } from 'rxjs';
import { ErrorHandlerService } from '../../servicos/shared/error-handler.service';
import { NotificationService } from '../../servicos/shared/notification.service';

@Component({
  selector: 'app-categoria',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css'],
})

export class CategoriaComponent implements OnInit {

  listaCategorias: Categoria[] = [];
  novaCategoriaNome = '';
  enviando = false;
  editandoId: number | null = null;

  constructor(
    private categoriaService: CategoriaService,
    private errorHandler: ErrorHandlerService,
    private notification: NotificationService
  ) { }

  ngOnInit(): void {
    this.obterCategorias();
  }

  private obterCategorias(): void {
    this.categoriaService.listar().subscribe({
      next: (categorias) => { this.listaCategorias = categorias; },
      error: (erro) => {
        console.error('Erro ao obter categorias:', erro);
        this.notification.erro(this.errorHandler.extrairMensagemErro(erro, 'Erro ao carregar categorias.'));
      }
    });
  }

  onSubmit(): void {
    const nome = this.novaCategoriaNome?.trim();
    if (!nome || this.enviando) return;

    this.enviando = true;
    const finalizar = () => {
      this.enviando = false;
    };

    if (this.editandoId != null) {
      this.categoriaService
        .atualizar(this.editandoId, { id: this.editandoId, nome })
        .pipe(finalize(finalizar))
        .subscribe({
          next: () => {
            this.obterCategorias();
            this.cancelarEdicao();
            this.notification.sucesso('Categoria atualizada com sucesso.');
          },
          error: (erro) => {
            console.error('Erro ao atualizar categoria:', erro);
            this.notification.erro(this.errorHandler.extrairMensagemErro(erro, 'Erro ao atualizar categoria.'));
          }
        });
    } else {
      const dto: PostCategoriaDTO = { nome };
      this.categoriaService
        .criar(dto)
        .pipe(finalize(finalizar))
        .subscribe({
          next: () => {
            this.obterCategorias();
            this.novaCategoriaNome = '';
            this.notification.sucesso('Categoria criada com sucesso.');
          },
          error: (erro) => {
            console.error('Erro ao criar categoria:', erro);
            this.notification.erro(this.errorHandler.extrairMensagemErro(erro, 'Erro ao criar categoria.'));
          }
        });
    }
  }
  
  iniciarEdicao(categoria: Categoria): void {
    if (this.enviando) return;
    this.editandoId = categoria.id;
    this.novaCategoriaNome = categoria.nome;
  }

  cancelarEdicao(): void {
    this.editandoId = null;
    this.novaCategoriaNome = '';
  }

  excluir(id: number): void {
    if (this.enviando) return;
    if (!confirm('Tem certeza que deseja excluir esta categoria?')) return;

    this.enviando = true;
    this.categoriaService.deletar(id)
      .pipe(finalize(() => this.enviando = false))
      .subscribe({
        next: () => {
          this.obterCategorias();
          this.notification.sucesso('Categoria excluída com sucesso.');
        },
        error: (erro) => {
          console.error('Erro ao excluir categoria:', erro);
          this.notification.erro(this.errorHandler.extrairMensagemErro(erro, 'Erro ao excluir categoria.'));
        }
      });
  }
}
