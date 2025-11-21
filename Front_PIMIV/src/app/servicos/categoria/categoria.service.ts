// src/app/services/categoria.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { PostCategoriaDTO } from '../../modelos/DTO/PostCategoriaDTO.model';
import { Categoria } from '../../modelos/Categoria.model';

@Injectable({ providedIn: 'root' })
export class CategoriaService {
  
  private readonly url = `http://localhost:5030/api/Categoria`;
  // private readonly url = `${environment.apiBaseUrl}/Categoria`;

  constructor(private http: HttpClient) { }

  listar(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.url);
  }

  obterPorId(id: number): Observable<Categoria> {
    return this.http.get<Categoria>(`${this.url}/${id}`);
  }
  
  // MAYBE? PENSANDO ALTO
  // obterPorNome(nome: string): Observable<Categoria> {
  //   return this.http.get<Categoria>(`${this.url}/nome/${nome}`);
  // }

  criar(dto: PostCategoriaDTO): Observable<Categoria> {
    return this.http.post<Categoria>(this.url, dto);
  }

  atualizar(id: number, categoria: Partial<Categoria>): Observable<void> {
    return this.http.put<void>(`${this.url}/${id}`, categoria);
  }

  deletar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}