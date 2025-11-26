// src/app/services/historico-produto.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GetHistoricoProdutoDTO } from '../../modelos/HistoricoProduto/GetHistoricoProdutoDTO.model';

@Injectable({ providedIn: 'root' })
export class HistoricoProdutoService {

  private readonly url = `http://localhost:5030/api/HistoricoProduto`;

  constructor(private http: HttpClient) { }

  /**
   * Fetches a list of all product price histories.
   * Corresponds to: GET /api/HistoricoProduto
   */
  obterTodosOsHistoricosProdutos(): Observable<GetHistoricoProdutoDTO[]> {
    return this.http.get<GetHistoricoProdutoDTO[]>(this.url);
  }

  /**
   * Fetches a specific product price history by its ID.
   * @param id The ID of the history record.
   * Corresponds to: GET /api/HistoricoProduto/{id}
   */
  obterHistoricoProdutoPorId(id: number): Observable<GetHistoricoProdutoDTO> {
    return this.http.get<GetHistoricoProdutoDTO>(`${this.url}/${id}`);
  }

  /**
   * Fetches the price history for a specific product by its product ID.
   * @param produtoId The ID of the product.
   * Corresponds to: GET /api/HistoricoProduto/produto/{produtoId}
   */
  obterHistoricoProdutoPorProdutoId(produtoId: number): Observable<GetHistoricoProdutoDTO[]> {
    return this.http.get<GetHistoricoProdutoDTO[]>(`${this.url}/produto/${produtoId}`);
  }
}