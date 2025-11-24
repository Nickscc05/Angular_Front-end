import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { PostProdutoDTO } from '../../modelos/Produto/PostProdutoDTO.model';
import { Produto } from '../../modelos/Produto/Produto.model';
import { GetProdutoEstoqueCriticoDTO } from '../../modelos/DTO/GetProdutoEstoqueCriticoDTO.model';
import { GetProdutoDTO } from '../../modelos/Produto/GetProdutoDTO';
import { PutProdutoDTO } from '../../modelos/Produto/PutProdutoDTO.models';

@Injectable({ providedIn: 'root' })
export class ProdutoService {
  
  private readonly url = `http://localhost:5030/api/Produto`;
  //private readonly url = `${environment.apiUrl}/Produto`;

  constructor(private http: HttpClient) {}

  // GET: api/Produto
  obterTodosOsProdutos(): Observable<GetProdutoDTO[]> {
    return this.http.get<GetProdutoDTO[]>(this.url);
  }

  // GET: api/Produto/estoque-critico
  obterProdutosComEstoqueCritico(): Observable<GetProdutoEstoqueCriticoDTO[]> {
    return this.http.get<GetProdutoEstoqueCriticoDTO[]>(`${this.url}/estoque-critico`);
  }

  // GET: api/Produto/{id}
  obterProdutoPorId(id: number): Observable<GetProdutoDTO> {
    return this.http.get<GetProdutoDTO>(`${this.url}/${id}`);
  }

  // GET: api/Produto/codigo/{codigo}
  obterProdutoPorCodigo(codigo: string): Observable<GetProdutoDTO> {
    return this.http.get<GetProdutoDTO>(`${this.url}/codigo/${codigo}`);
  }

  // POST: api/Produto
  criarProduto(produto: PostProdutoDTO): Observable<GetProdutoDTO> {
    return this.http.post<GetProdutoDTO>(this.url, produto);
  }

  // PUT: api/Produto/{id}
  atualizarProduto(id: number, produto: PutProdutoDTO): Observable<void> {
    return this.http.put<void>(`${this.url}/${id}`, produto);
  }

  // DELETE: api/Produto/{id}
  deletarProduto(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}