// src/app/services/financeiro.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Entrada {
  id: number;
  descricaoProduto: string; // Ou outro campo que represente o produto
  codigo: string; // Se houver um código de produto
  precoTotal: number;
  itens: number;
  dataCompra: string;
  fornecedorId: number;
  // Se você usou .Include() no backend:
  // fornecedor: { nome: string }; 
}

@Injectable({
  providedIn: 'root'
})
export class FinanceiroService {

  // Defina a URL base da sua API
  private apiUrl = 'http://localhost:5030/api/Financeiro'; // Ajuste a URL base

  constructor(private http: HttpClient) { }

  /**
   * Obtém o lucro semanal do backend.
   * O tipo de retorno é 'number' no TypeScript, pois o JSON será desserializado para um número.
   */
  obterLucroSemanal(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/lucro-semanal`);
  }

  obterGastosMensais(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/gastos-mensais`);
  }

  obterVendasDiarias(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/vendas-diarias`);
  }
  
  obterEntradasRecentes(limite: number = 6): Observable<Entrada[]> {
    return this.http.get<Entrada[]>(`${this.apiUrl}/entradas-recentes?limite=${limite}`);
  }
}