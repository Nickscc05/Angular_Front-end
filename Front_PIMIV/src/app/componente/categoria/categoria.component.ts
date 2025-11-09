import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CategoriaService } from '../../servicos/categoria/categoria.service';
import { Categoria } from '../../modelos/Categoria.model';

@Component({
  selector: 'app-categoria',
  imports: [CommonModule],
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css'],
})

export class CategoriaComponent {

  listaCategorias: Categoria[] = [];
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
  
  // private obterCategoriaPorId(id: number): void {
  //   this.categoriaService.obter(id).subscribe({
  //     next: (categoria) => { console.log('Categoria obtida:', categoria); },
  //     error: (erro) => { console.error(`Erro ao obter categoria com ID ${id}:`, erro); }
  //   });
  // }
}