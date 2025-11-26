import { Injectable } from '@angular/core';
import { GetLucroSemanalDTO } from '../../modelos/Financeiro/GetLucroSemanal';
import { Observable } from 'rxjs/internal/Observable';
import { GetGastosMensaisDTO } from '../../modelos/Financeiro/GetGastosMensais';
import { GetVendasDiariasDTO } from '../../modelos/Financeiro/GetVendasDiarias';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class FinanceiroService {

    private readonly url = 'http://localhost:5030/api/Financeiro'; // Adjust the base URL as needed

  constructor(private http: HttpClient) { }

  /**
   * Fetches the weekly profit (current day to 7 days ago).
   * Corresponds to: GET /api/Financeiro/lucro-semanal
   */
  obterLucroSemanal(): Observable<GetLucroSemanalDTO> {
    return this.http.get<GetLucroSemanalDTO>(`${this.url}/lucro-semanal`);
  }

  /**
   * Fetches the total expenses for the current month.
   * Corresponds to: GET /api/Financeiro/gastos-mensais
   */
  obterGastosMensais(): Observable<GetGastosMensaisDTO> {
    return this.http.get<GetGastosMensaisDTO>(`${this.url}/gastos-mensais`);
  }

  /**
   * Fetches the total sales for the current day.
   * Corresponds to: GET /api/Financeiro/vendas-diarias
   */
  obterVendasDiarias(): Observable<GetVendasDiariasDTO> {
    return this.http.get<GetVendasDiariasDTO>(`${this.url}/vendas-diarias`);
  }
}
