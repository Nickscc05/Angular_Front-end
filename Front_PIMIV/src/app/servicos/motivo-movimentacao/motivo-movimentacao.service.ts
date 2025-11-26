// src/app/services/motivo-movimentacao.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { PostMotivoMovimentacaoDTO } from '../../modelos/DTO/MotivoMovimentacao/PostMotivoMovimentacaoDTO.model';
import { MotivoMovimentacao } from '../../modelos/MotivoMovimentacao/MotivoMovimentacao.model';
import { PutMotivoMovimentacaoDTO } from '../../modelos/DTO/MotivoMovimentacao/PutMotivoMovimentacaoDTO.model';

@Injectable({ providedIn: 'root' })
export class MotivoMovimentacaoService {

  private readonly url = `http://localhost:5030/api/MotivoMovimentacao`;
  // private readonly url = `${environment.apiBaseUrl}/MotivoMovimentacao`;

  constructor(private http: HttpClient) { }

  obterTodos(): Observable<MotivoMovimentacao[]> {
    return this.http.get<MotivoMovimentacao[]>(this.url);
  }

  obterPorId(id: number): Observable<MotivoMovimentacao> {
    return this.http.get<MotivoMovimentacao>(`${this.url}/${id}`);
  }

  criar(motivo: PostMotivoMovimentacaoDTO): Observable<MotivoMovimentacao> {
    return this.http.post<MotivoMovimentacao>(this.url, motivo);
  }

  atualizar(id: number, motivo: PutMotivoMovimentacaoDTO): Observable<void> {
    return this.http.put<void>(`${this.url}/${id}`, motivo);
  }

  deletar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}