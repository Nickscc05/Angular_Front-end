import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UnidadeMedida } from '../../modelos/UnidadeMedida/UnidadeMedida.model';
import { Observable } from 'rxjs';
import { PostUnidadeMedidaDTO } from '../../modelos/DTO/PostUnidadeMedidaDTO.model';
import { PutUnidadeMedidaDTO } from '../../modelos/DTO/PutUnidadeMedidaDTO.model';

@Injectable({ providedIn: 'root', })

export class UnidadeMedidaService {
  
  private apiUrl = 'http://localhost:5030/api/UnidadeMedida';
  //private apiUrl = `${environment.apiUrl}/UnidadeMedida`;

  constructor(private http: HttpClient) { }

  /**
   * Obtém todas as unidades de medida
   * GET: api/UnidadeMedida
   */
  obterTodas(): Observable<UnidadeMedida[]> {
    return this.http.get<UnidadeMedida[]>(this.apiUrl);
  }

  /**
   * Obtém uma unidade de medida pelo ID
   * GET: api/UnidadeMedida/{id}
   */
  obterPorId(id: number): Observable<UnidadeMedida> {
    return this.http.get<UnidadeMedida>(`${this.apiUrl}/${id}`);
  }

  /**
   * Cria uma nova unidade de medida
   * POST: api/UnidadeMedida
   */
  criar(unidade: PostUnidadeMedidaDTO): Observable<UnidadeMedida> {
    return this.http.post<UnidadeMedida>(this.apiUrl, unidade);
  }

  /**
   * Atualiza uma unidade de medida existente
   * PUT: api/UnidadeMedida/{id}
   */
  atualizar(id: number, unidade: PutUnidadeMedidaDTO): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, unidade);
  }

  /**
   * Remove uma unidade de medida
   * DELETE: api/UnidadeMedida/{id}
   */
  deletar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
