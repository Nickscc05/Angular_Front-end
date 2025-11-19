import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CategoriaService } from '../../servicos/categoria/categoria.service';
import { Categoria } from '../../modelos/Categoria.model';
import { PostCategoriaDTO } from '../../modelos/DTO/PostCategoriaDTO.model';
import { finalize } from 'rxjs';

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
  mensagem: string | null = null;
  mensagemTipo: 'sucesso' | 'falha' | null = null;
  private limparMensagemTimeoutId: ReturnType<typeof setTimeout> | null = null;

  constructor(private categoriaService: CategoriaService) { }

  ngOnInit(): void {
    this.obterCategorias();
  }

  private obterCategorias(): void {
    
    this.categoriaService.listar().subscribe({
      next: (categorias) => { this.listaCategorias = categorias; },
      error: (erro) => {
        console.error('Erro ao obter categorias:', erro);
        this.mostrarMensagem('falha', this.extrairMensagemErro(erro, 'Erro ao carregar categorias.'));
      }
    });
  }

  onSubmit(): void {

    const nome = this.novaCategoriaNome?.trim();
    if (!nome || this.enviando) return;

    this.enviando = true;
    // Se estiver em alterando, atualizar; caso contrário, criar
    const finalizar = () => {
      this.enviando = false;
    };

    if (this.editandoId != null) {

      // Envia no corpo o mesmo id da rota para evitar exceção no backend
      this.categoriaService
        .atualizar(this.editandoId, { id: this.editandoId, nome })
        .pipe(finalize(finalizar))
        .subscribe({
          
          next: () => {
            this.obterCategorias();
            this.cancelarEdicao();
            this.mostrarMensagem('sucesso', 'Categoria atualizada com sucesso.');
          },
          error: (erro) => {
            console.error('Erro ao atualizar categoria:', erro);
            this.mostrarMensagem('falha', this.extrairMensagemErro(erro, 'Erro ao atualizar categoria.'));
          }
        });

    } else {

      const dto: PostCategoriaDTO = { nome };

      this.categoriaService
        .criar(dto)
        .pipe(finalize(finalizar))
        .subscribe({

          next: () => {
            // Recarrega a lista para mostrar o ID gerado e o estado do backend
            this.obterCategorias();
            // Limpa o campo do formulário
            this.novaCategoriaNome = '';
            this.mostrarMensagem('sucesso', 'Categoria criada com sucesso.');
          },
          error: (erro) => {
            console.error('Erro ao criar categoria:', erro);
            this.mostrarMensagem('falha', this.extrairMensagemErro(erro, 'Erro ao criar categoria.'));
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

  private mostrarMensagem(tipo: 'sucesso' | 'falha', texto: string): void {
    this.mensagem = texto;
    this.mensagemTipo = tipo;

    if (this.limparMensagemTimeoutId) {
      clearTimeout(this.limparMensagemTimeoutId);
    }

    this.limparMensagemTimeoutId = setTimeout(() => {
      this.mensagem = null;
      this.mensagemTipo = null;
      this.limparMensagemTimeoutId = null;
    }, 5000);
  }

  private extrairMensagemErro(erro: unknown, fallback: string): string {

    if (typeof erro === 'string' && erro.trim()) {
      return erro;
    }

    const httpErro = erro as { error?: unknown; message?: string } | null | undefined;
    const detalhe = httpErro?.error as { message?: string; detail?: string } | string | undefined;

    if (typeof detalhe === 'string' && detalhe.trim()) {
      return detalhe;
    }

    if (typeof detalhe === 'object' && detalhe) {

      const info = detalhe as { message?: string; detail?: string };
      const mensagem = info.message ?? info.detail;
      if (mensagem && mensagem.trim()) {
        return mensagem;
      }
    }

    if (httpErro?.message && httpErro.message.trim()) {
      return httpErro.message;
    }

    return fallback;
  }
  
  // private obterCategoriaPorId(id: number): void {
  //   this.categoriaService.obter(id).subscribe({
  //     next: (categoria) => { console.log('Categoria obtida:', categoria); },
  //     error: (erro) => { console.error(`Erro ao obter categoria com ID ${id}:`, erro); }
  //   });
  // }
}