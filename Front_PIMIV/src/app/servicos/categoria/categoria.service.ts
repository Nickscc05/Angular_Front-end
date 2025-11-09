// src/app/services/categoria.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { PostCategoriaDTO } from '../../modelos/DTO/PostCategoriaDTO.model';

export interface Categoria {
  id: number;
  nome: string;
}

@Injectable({ providedIn: 'root' })
export class CategoriaService {
  private readonly url = `${environment.apiBaseUrl}/Categoria`;

  constructor(private http: HttpClient) {}

  listar(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.url);
  }

  obter(id: number): Observable<Categoria> {
    return this.http.get<Categoria>(`${this.url}/${id}`);
  }

  criar(dto: PostCategoriaDTO): Observable<Categoria> {
    return this.http.post<Categoria>(this.url, dto);
  }

  atualizar(id: number, categoria: Partial<Categoria>): Observable<void> {
    return this.http.put<void>(`${this.url}/${id}`, categoria);
  }

  // delete foi comentado no backend; habilite se expor
  // deletar(id: number): Observable<void> {
  //   return this.http.delete<void>(`${this.url}/${id}`);
  // }
}