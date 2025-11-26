import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetEntradaSimplesDTO } from '../../modelos/Entrada/GetEntradaSimplesDTO.model';
import { GetEntradaDTO } from '../../modelos/Entrada/GetEntradaDTO.model';
import { HttpClient } from '@angular/common/http';
import { PostEntradaDTO } from '../../modelos/DTO/PostEntradaDTO.model';

@Injectable({
  providedIn: 'root',
})
export class EntradaService {
  private readonly url = 'http://localhost:5030/api/Entrada'; // Adjust the base URL as needed

  constructor(private http: HttpClient) { }

  /**
   * Fetches a list of all entries in a simplified format.
   * Corresponds to: GET /api/Entrada
   */
  obterTodasAsEntradas(): Observable<GetEntradaSimplesDTO[]> {
    return this.http.get<GetEntradaSimplesDTO[]>(this.url);
  }

  /**
   * Fetches the details of a specific entry by its ID.
   * @param id The ID of the entry.
   * Corresponds to: GET /api/Entrada/{id}
   */
  obterEntradaPorId(id: number): Observable<GetEntradaDTO> {
    return this.http.get<GetEntradaDTO>(`${this.url}/${id}`);
  }
  
  /**
   * Fetches a list of recent entries.
   * Corresponds to: GET /api/Entrada/entradas-recentes
   */
  obterEntradasRecentes(): Observable<GetEntradaDTO[]> {
    return this.http.get<GetEntradaDTO[]>(`${this.url}/entradas-recentes`);
  }

  /**
   * Creates a new entry.
   * @param entrada The data for the new entry.
   * Corresponds to: POST /api/Entrada
   */
  criarEntrada(entrada: PostEntradaDTO): Observable<GetEntradaDTO> {
    return this.http.post<GetEntradaDTO>(this.url, entrada);
  }
}
