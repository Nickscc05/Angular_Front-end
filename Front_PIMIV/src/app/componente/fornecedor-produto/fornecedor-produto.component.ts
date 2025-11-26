import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable, of, combineLatest } from 'rxjs';
import { catchError, finalize, map } from 'rxjs/operators';

import { FornecedorProdutoService } from '../../servicos/fornecedor-produto/fornecedor-produto.service';
import { ProdutoService } from '../../servicos/produto/produto.service';
import { FornecedorService } from '../../servicos/fornecedor/fornecedor.service';
import { NotificationService } from '../../servicos/shared/notification.service';
import { ErrorHandlerService } from '../../servicos/shared/error-handler.service';

import { GetProdutoDTO } from '../../modelos/Produto/GetProdutoDTO';
import { GetFornecedorDTO } from '../../modelos/Fornecedor/GetFornecedor.model';

type FornecedorProdutoDisplay = {
  fornecedorNome: string;
  produtoNome: string;
  codigoFornecedor: string;
};

@Component({
  selector: 'app-fornecedor-produto',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './fornecedor-produto.component.html',
  styleUrls: ['./fornecedor-produto.component.css']
})
export class FornecedorProdutoComponent implements OnInit {

  produtos$: Observable<GetProdutoDTO[]> = of([]);
  fornecedores$: Observable<GetFornecedorDTO[]> = of([]);
  fornecedorProduto$: Observable<FornecedorProdutoDisplay[]> = of([]);

  searchType: 'todos' | 'idFornecedor' | 'idProduto' = 'todos';
  selectedProduto: number | null = null;
  selectedFornecedor: number | null = null;
  loading = false;

  constructor(
    private fornecedorProdutoService: FornecedorProdutoService,
    private produtoService: ProdutoService,
    private fornecedorService: FornecedorService,
    private notification: NotificationService,
    private errorHandler: ErrorHandlerService
  ) { }

  ngOnInit(): void {
    this.carregarProdutos();
    this.carregarFornecedores();
  }

  carregarProdutos(): void {
    this.produtos$ = this.produtoService.obterTodosOsProdutos().pipe(
      catchError(error => {
        this.notification.erro(this.errorHandler.extrairMensagemErro(error, 'Erro ao carregar produtos.'));
        return of([]);
      })
    );
  }

  carregarFornecedores(): void {
    this.fornecedores$ = this.fornecedorService.obterTodosOsFornecedores().pipe(
      catchError(error => {
        this.notification.erro(this.errorHandler.extrairMensagemErro(error, 'Erro ao carregar fornecedores.'));
        return of([]);
      })
    );
  }

  onSearch(): void {
    this.loading = true;
    this.fornecedorProduto$ = of([]);

    let searchObservable: Observable<FornecedorProdutoDisplay[]>;

    switch (this.searchType) {
      case 'todos':
        searchObservable = combineLatest([
          this.fornecedorProdutoService.obterTodosOsFornecedorProduto(),
          this.fornecedores$,
          this.produtos$
        ]).pipe(
          map(([fornecedorProdutos, fornecedores, produtos]) => {
            return fornecedorProdutos.map(fp => ({
              fornecedorNome: fornecedores.find(f => f.id === fp.fornecedorId)?.nome || 'Desconhecido',
              produtoNome: produtos.find(p => p.id === fp.produtoId)?.nome || 'Desconhecido',
              codigoFornecedor: fp.codigoFornecedor
            }));
          })
        );
        break;

      case 'idFornecedor':
        if (!this.selectedFornecedor) {
          this.notification.info('Por favor, selecione um fornecedor para a busca.');
          this.loading = false;
          return;
        }
        searchObservable = this.fornecedorService.obterProdutosPorFornecedorId(this.selectedFornecedor).pipe(
          map(response => {
            const fornecedorNome = response.nomeFantasia;
            return response.produtos.map(p => ({
              fornecedorNome: fornecedorNome,
              produtoNome: p.nomeProduto,
              codigoFornecedor: p.codigoFornecedor
            }));
          })
        );
        break;

      case 'idProduto':
        if (!this.selectedProduto) {
          this.notification.info('Por favor, selecione um produto para a busca.');
          this.loading = false;
          return;
        }
        searchObservable = this.produtoService.obterFornecedoresPorProdutoId(this.selectedProduto).pipe(
          map(response => {
            const produtoNome = response.nome;
            return response.fornecedores.map(f => ({
              fornecedorNome: f.nomeFantasia,
              produtoNome: produtoNome,
              codigoFornecedor: f.codigoFornecedor
            }));
          })
        );
        break;
    }

    this.fornecedorProduto$ = searchObservable.pipe(
      map(data => {
        if (!data || data.length === 0) {
          this.notification.info('Nenhuma relação encontrada com os filtros aplicados.');
        }
        return data;
      }),
      catchError(error => {
        this.notification.erro(this.errorHandler.extrairMensagemErro(error, 'Erro ao buscar os dados.'));
        return of([]);
      }),
      finalize(() => {
        this.loading = false;
      })
    );
  }

  clearFilters(): void {
    this.searchType = 'todos';
    this.selectedProduto = null;
    this.selectedFornecedor = null;
    this.fornecedorProduto$ = of([]);
  }

  isSearchButtonDisabled(): boolean {
    if (this.loading) {
      return true;
    }
    if (this.searchType === 'idFornecedor' && !this.selectedFornecedor) {
      return true;
    }
    if (this.searchType === 'idProduto' && !this.selectedProduto) {
      return true;
    }
    return false;
  }
}
