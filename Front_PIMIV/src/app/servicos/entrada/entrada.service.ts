import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetEntradaSimples } from '../../modelos/Entrada/GetEntradaSimplesDTO.model';
import { GetEntradaDTO } from '../../modelos/Entrada/GetEntradaDTO.model';
import { PostEntrada } from '../../modelos/Entrada/PostEntradaDTO.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class Entrada {
  private readonly apiUrl = 'http://localhost:5030/api/Entrada'; // Adjust the base URL as needed

  constructor(private http: HttpClient) { }

  /**
   * Fetches a list of all entries in a simplified format.
   * Corresponds to: GET /api/Entrada
   */
  obterTodasAsEntradas(): Observable<GetEntradaSimples[]> {
    return this.http.get<GetEntradaSimples[]>(this.apiUrl);
  }

  /**
   * Fetches the details of a specific entry by its ID.
   * @param id The ID of the entry.
   * Corresponds to: GET /api/Entrada/{id}
   */
  obterEntradaPorId(id: number): Observable<GetEntradaDTO> {
    return this.http.get<GetEntradaDTO>(`${this.apiUrl}/${id}`);
  }
  
  /**
   * Fetches a list of recent entries.
   * Corresponds to: GET /api/Entrada/entradas-recentes
   */
  obterEntradasRecentes(): Observable<Entrada[]> {
    return this.http.get<Entrada[]>(`${this.apiUrl}/entradas-recentes`);
  }

  /**
   * Creates a new entry.
   * @param entrada The data for the new entry.
   * Corresponds to: POST /api/Entrada
   */
  criarEntrada(entrada: PostEntrada): Observable<Entrada> {
    return this.http.post<Entrada>(this.apiUrl, entrada);
  }
}
