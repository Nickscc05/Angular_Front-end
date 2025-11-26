import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GetFornecedorProdutoDTO } from '../../modelos/FornecedorProduto/GetFornecedorProdutoDTO.model';
import { Observable } from 'rxjs';
import { PostFornecedorProdutoDTO } from '../../modelos/FornecedorProduto/PostFornecedorProdutoDTO.model';
import { PutFornecedorProdutoDTO } from '../../modelos/FornecedorProduto/PutFornecedorProdutoDTO.model';

@Injectable({
  providedIn: 'root',
})
export class FornecedorProdutoService {

  private readonly url = 'http://localhost:5030/api/FornecedorProduto'; // Ajuste a URL base da sua API

  constructor(private http: HttpClient) { }

  obterTodosOsFornecedorProduto(): Observable<GetFornecedorProdutoDTO[]> {
    return this.http.get<GetFornecedorProdutoDTO[]>(this.url);
  }

  obterFornecedorProdutoPorId(fornecedorId: number, produtoId: number): Observable<GetFornecedorProdutoDTO> {
    return this.http.get<GetFornecedorProdutoDTO>(`${this.url}/${fornecedorId}/${produtoId}`);
  }

  // Ainda é necessário decidir como será feita essa parte de FornecedorProduto
  // criarFornecedorProduto(fornecedorProduto: PostFornecedorProdutoDTO): Observable<GetFornecedorProdutoDTO> {
  //   return this.http.post<GetFornecedorProdutoDTO>(this.url, fornecedorProduto);
  // }

  // criarVariosFornecedorProduto(fornecedorProdutos: PostFornecedorProdutoDTO[]): Observable<GetFornecedorProdutoDTO[]> {
  //   return this.http.post<GetFornecedorProdutoDTO[]>(`${this.url}/batch`, fornecedorProdutos);
  // }

  // atualizarFornecedorProduto(fornecedorId: number, produtoId: number, fornecedorProduto: PutFornecedorProdutoDTO): Observable<any> {
  //   return this.http.put(`${this.url}/${fornecedorId}/${produtoId}`, fornecedorProduto);
  // }

  // deletarFornecedorProduto(fornecedorId: number, produtoId: number): Observable<any> {
  //   return this.http.delete(`${this.url}/${fornecedorId}/${produtoId}`);
  // }
}
