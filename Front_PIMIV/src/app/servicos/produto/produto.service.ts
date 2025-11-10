import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { PostProdutoDTO } from '../../modelos/DTO/PostProdutoDTO.model';
import { Produto } from '../../modelos/Produto.model';
import { GetProdutoEstoqueCriticoDTO } from '../../modelos/DTO/GetProdutoEstoqueCriticoDTO.model';

@Injectable({ providedIn: 'root' })
export class ProdutoService {
  
  private readonly url = `http://localhost:5030/api/Produto`;
  //private readonly url = `${environment.apiUrl}/Produto`;

  constructor(private http: HttpClient) {}

  listar(): Observable<Produto[]> {
    return this.http.get<Produto[]>(this.url);
  }

  obter(id: number): Observable<Produto> {
    return this.http.get<Produto>(`${this.url}/${id}`);
  }
  
  // getObterPorCodigo(codigo: string): Observable<Produto> {
  //   return this.http.get<Produto>(`${this.url}/codigo/${codigo}`);
  // }

  getEstoqueCritico(): Observable<GetProdutoEstoqueCriticoDTO[]> {
    return this.http.get<GetProdutoEstoqueCriticoDTO[]>(`${this.url}/estoque-critico`);
  }

  criar(dto: PostProdutoDTO): Observable<Produto> {
    return this.http.post<Produto>(this.url, dto);
  }

  atualizar(id: number, produto: Partial<Produto>): Observable<void> {
    return this.http.put<void>(`${this.url}/${id}`, produto);
  }
  
}