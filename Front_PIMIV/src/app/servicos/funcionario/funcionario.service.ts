import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PostFuncionarioDTO } from '../../modelos/Funcionario/PostFuncionarioDTO.model';
import { GetFuncionarioDTO } from '../../modelos/Funcionario/GetFuncionarioDTO';
import { PutFuncionarioDTO } from '../../modelos/Funcionario/PutFuncionarioDTO.model';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {

  //private apiUrl = `${environment.apiUrl}/Funcionario`;
  private url = 'http://localhost:5030/api/Funcionario';

  constructor(private http: HttpClient) { }

  obterTodos(): Observable<GetFuncionarioDTO[]> {
    return this.http.get<GetFuncionarioDTO[]>(this.url);
  }

  obterPorId(id: number): Observable<GetFuncionarioDTO> {
    return this.http.get<GetFuncionarioDTO>(`${this.url}/${id}`);
  }

  criar(funcionario: PostFuncionarioDTO): Observable<GetFuncionarioDTO> {
    return this.http.post<GetFuncionarioDTO>(this.url, funcionario);
  }

  atualizar(id: number, funcionario: PutFuncionarioDTO): Observable<void> {
    return this.http.put<void>(`${this.url}/${id}`, funcionario);
  }

  deletar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}

// Implementação com DTOs
// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { Funcionario } from '../../modelos/Funcionario/Funcionario.model'; // Ajuste o caminho conforme sua estrutura
// import { PostFuncionarioDTO } from '../../modelos/Funcionario/PostFuncionarioDTO.model';

// // Endereço base da API de Funcionários (Ajuste esta URL para a rota correta do seu backend)
// // Nota: Em um ambiente de produção, esta URL estaria em um arquivo de environment.
// const API_URL = 'http://localhost:4200/api/Funcionario';

// @Injectable({
//   providedIn: 'root'
// })
// export class FuncionarioService {

//   //private apiUrl = `${environment.apiUrl}/Funcionario`;
//   private url = 'http://localhost:5030/api/Funcionario';

//   constructor(private http: HttpClient) { }

//   obterTodos(): Observable<GetFuncionarioDTO[]> {
//     return this.http.get<GetFuncionarioDTO[]>(this.url);
//   }

//   obterPorId(id: number): Observable<GetFuncionarioDTO> {
//     return this.http.get<GetFuncionarioDTO>(`${this.url}/${id}`);
//   }

//   criar(funcionario: PostFuncionarioDTO): Observable<GetFuncionarioDTO> {
//     return this.http.post<GetFuncionarioDTO>(this.url, funcionario);
//   }

//   atualizar(id: number, funcionario: PutFuncionarioDTO): Observable<void> {
//     return this.http.put<void>(`${this.url}/${id}`, funcionario);
//   }

//   deletar(id: number): Observable<void> {
//     return this.http.delete<void>(`${this.url}/${id}`);
//   }
// }