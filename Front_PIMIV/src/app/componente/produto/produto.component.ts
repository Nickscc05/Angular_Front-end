import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProdutoService } from '../../servicos/produto/produto.service';
import { NotificationService } from '../../servicos/shared/notification.service';
import { ErrorHandlerService } from '../../servicos/shared/error-handler.service';
import { ProdutoFormComponent } from './produto-form/produto-form.component';
import { GetProdutoDTO } from '../../modelos/Produto/GetProdutoDTO';

@Component({
  selector: 'app-produto',
  standalone: true,
  imports: [CommonModule, ProdutoFormComponent],
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.css'],
})

export class ProdutoComponent implements OnInit {
  listaProdutos: GetProdutoDTO[] = [];
  carregando = false;
  
  // Controle do Modal
  mostrarModal = false;
  produtoIdParaEditar: number | null = null;

  constructor(
    private produtoService: ProdutoService,
    private notification: NotificationService,
    private errorHandler: ErrorHandlerService
  ) {}

  ngOnInit(): void {
    this.obterProdutos();
  }

  obterProdutos(): void {
    this.carregando = true;
    this.produtoService.obterTodosOsProdutos().subscribe({
      next: (produtos) => {
        this.listaProdutos = produtos;
        this.carregando = false;
        console.log('Produtos carregados:', produtos);
      },
      error: (erro) => {
        console.error('Erro ao obter produtos:', erro);
        this.notification.erro(this.errorHandler.extrairMensagemErro(erro, 'Erro ao carregar produtos.'));
        this.carregando = false;
      }
    });
  }

  abrirModalCriacao(): void {
    this.produtoIdParaEditar = null;
    this.mostrarModal = true;
  }

  abrirModalEdicao(produto: GetProdutoDTO): void {
    this.produtoIdParaEditar = produto.id;
    this.mostrarModal = true;
  }

  fecharModal(atualizarLista: boolean): void {
    this.mostrarModal = false;
    this.produtoIdParaEditar = null;
    if (atualizarLista) {
      this.obterProdutos();
    }
  }

  excluir(id: number): void {
    if (!confirm('Tem certeza que deseja excluir este produto?')) return;

    this.carregando = true;
    this.produtoService.deletarProduto(id).subscribe({
      next: () => {
        this.notification.sucesso('Produto excluído com sucesso.');
        this.obterProdutos();
      },
      error: (erro) => {
        console.error('Erro ao excluir produto:', erro);
        this.notification.erro(this.errorHandler.extrairMensagemErro(erro, 'Erro ao excluir produto.'));
      },
      complete: () => this.carregando = false
    });
  }
}
