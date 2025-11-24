// src/app/services/categoria.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { PostCategoriaDTO } from '../../modelos/Categoria/PostCategoriaDTO.model';
import { Categoria } from '../../modelos/Categoria/Categoria.model';
import { PutCategoriaDTO } from '../../modelos/Categoria/PutCategoriaDTO.model';

@Injectable({ providedIn: 'root' })
export class CategoriaService {

  private readonly url = `http://localhost:5030/api/Categoria`;
  // private readonly url = `${environment.apiBaseUrl}/Categoria`;

  constructor(private http: HttpClient) { }

  obterTodas(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.url);
  }

  obterPorId(id: number): Observable<Categoria> {
    return this.http.get<Categoria>(`${this.url}/${id}`);
  }

  criar(categoria: PostCategoriaDTO): Observable<Categoria> {
    return this.http.post<Categoria>(this.url, categoria);
  }

  atualizar(id: number, categoria: PutCategoriaDTO): Observable<void> {
    return this.http.put<void>(`${this.url}/${id}`, categoria);
  }

  deletar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}