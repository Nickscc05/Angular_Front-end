import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CategoriaService } from '../../servicos/categoria/categoria.service';
import { Categoria } from '../../modelos/Categoria.model';

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

  constructor(private categoriaService: CategoriaService) { }

  ngOnInit(): void {
    this.obterCategorias();
  }

  private obterCategorias(): void {
    this.categoriaService.listar().subscribe({
      next: (categorias) => { this.listaCategorias = categorias; },
      error: (erro) => { console.error('Erro ao obter categorias:', erro); }
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
      this.categoriaService.atualizar(this.editandoId, { id: this.editandoId, nome }).subscribe({
        next: () => {
          this.obterCategorias();
          this.cancelarEdicao();
        },
        error: (erro) => {
          console.error('Erro ao atualizar categoria:', erro);
        },
        complete: finalizar
      });
    } else {
      this.categoriaService.criar({ nome }).subscribe({
        next: () => {
          // Recarrega a lista para refletir o ID gerado e o estado do backend
          this.obterCategorias();
          // Limpa o campo do formulário
          this.novaCategoriaNome = '';
        },
        error: (erro) => {
          console.error('Erro ao criar categoria:', erro);
        },
        complete: finalizar
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
  
  // private obterCategoriaPorId(id: number): void {
  //   this.categoriaService.obter(id).subscribe({
  //     next: (categoria) => { console.log('Categoria obtida:', categoria); },
  //     error: (erro) => { console.error(`Erro ao obter categoria com ID ${id}:`, erro); }
  //   });
  // }
}