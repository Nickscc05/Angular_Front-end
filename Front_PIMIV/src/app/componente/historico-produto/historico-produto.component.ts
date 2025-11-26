import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { catchError, finalize, map, tap } from 'rxjs/operators';

import { HistoricoProdutoService } from '../../servicos/historico-produto/historico-produto.service';
import { ProdutoService } from '../../servicos/produto/produto.service';
import { NotificationService } from '../../servicos/shared/notification.service';
import { ErrorHandlerService } from '../../servicos/shared/error-handler.service';

import { GetHistoricoProdutoDTO } from '../../modelos/HistoricoProduto/GetHistoricoProdutoDTO.model';
import { GetProdutoDTO } from '../../modelos/Produto/GetProdutoDTO';

@Component({
  selector: 'app-historico-produto',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl:'./historico-produto.component.html',
  styleUrls: ['./historico-produto.component.css']
})
export class HistoricoProdutoComponent implements OnInit {

  produtos$: Observable<GetProdutoDTO[]> = of([]);
  historico$: Observable<GetHistoricoProdutoDTO[]> = of([]);

  searchType: 'todos' | 'idRegistro' | 'idProduto' = 'todos';
  searchId: number | null = null;
  selectedProduto: number | null = null;
  loadingHistorico = false;

  constructor(
    private historicoProdutoService: HistoricoProdutoService,
    private produtoService: ProdutoService,
    private notification: NotificationService,
    private errorHandler: ErrorHandlerService
  ) { }

  ngOnInit(): void {
    this.carregarProdutos();
  }

  carregarProdutos(): void {
    this.produtos$ = this.produtoService.obterTodosOsProdutos().pipe(
      catchError(error => {
        this.notification.erro(this.errorHandler.extrairMensagemErro(error, 'Erro ao carregar produtos.'));
        return of([]);
      })
    );
  }

  onSearch(): void {
    this.loadingHistorico = true;
    this.historico$ = of([]); 

    let searchObservable: Observable<GetHistoricoProdutoDTO[]>;

    switch (this.searchType) {
      case 'todos':
        searchObservable = this.historicoProdutoService.obterTodosOsHistoricosProdutos();
        break;

      case 'idRegistro':
        if (!this.searchId) {
          this.notification.info('Por favor, insira um ID de registro para a busca.');
          this.loadingHistorico = false;
          return;
        }
        searchObservable = this.historicoProdutoService.obterHistoricoProdutoPorId(this.searchId).pipe(
          map(data => data ? [data] : []) 
        );
        break;

      case 'idProduto':
        if (!this.selectedProduto) {
          this.notification.info('Por favor, selecione um produto para a busca.');
          this.loadingHistorico = false;
          return;
        }
        searchObservable = this.historicoProdutoService.obterHistoricoProdutoPorProdutoId(this.selectedProduto);
        break;
    }

    this.historico$ = searchObservable.pipe(
      tap(data => {
        if (!data || data.length === 0) {
          this.notification.info('Nenhum histórico encontrado com os filtros aplicados.');
        }
      }),
      catchError(error => {
        this.notification.erro(this.errorHandler.extrairMensagemErro(error, 'Erro ao buscar o histórico.'));
        return of([]);
      }),
      finalize(() => {
        this.loadingHistorico = false;
      })
    );
  }

  clearFilters(): void {
    this.searchType = 'todos';
    this.searchId = null;
    this.selectedProduto = null;
    this.historico$ = of([]);
  }

  isSearchButtonDisabled(): boolean {
    if (this.loadingHistorico) {
      return true;
    }
    if (this.searchType === 'idRegistro' && !this.searchId) {
      return true;
    }
    if (this.searchType === 'idProduto' && !this.selectedProduto) {
      return true;
    }
    return false;
  }
}
