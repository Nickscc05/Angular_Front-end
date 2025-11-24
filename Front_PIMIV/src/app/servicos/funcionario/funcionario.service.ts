import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Funcionario } from '../../modelos/Funcionario.model'; // Ajuste o caminho conforme sua estrutura

// Endereço base da API de Funcionários (Ajuste esta URL para a rota correta do seu backend)
// Nota: Em um ambiente de produção, esta URL estaria em um arquivo de environment.
const API_URL = 'http://localhost:4200/api/Funcionario'; 

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {

  // O HttpClient é injetado automaticamente pelo Angular
  constructor(private http: HttpClient) { }

  /**
   * Obtém a lista completa de funcionários (GET /api/Funcionario).
   * @returns Observable<Funcionario[]>
   */
  listar(): Observable<Funcionario[]> {
    // Envia uma requisição GET e espera um array de objetos Funcionario
    return this.http.get<Funcionario[]>(API_URL);
  }

  /**
   * Cadastra um novo funcionário (POST /api/Funcionario).
   * @param funcionario Dados do funcionário a ser cadastrado.
   * @returns Observable<Funcionario> O funcionário cadastrado, geralmente com o ID gerado.
   */
  cadastrar(funcionario: Funcionario): Observable<Funcionario> {
    // Envia os dados do funcionário. O backend deve processar a senha.
    return this.http.post<Funcionario>(API_URL, funcionario);
  }

  /**
   * Atualiza os dados de um funcionário existente (PUT /api/Funcionario/{id}).
   * @param funcionario Dados atualizados do funcionário.
   * @returns Observable<Funcionario>
   */
  atualizar(funcionario: Funcionario): Observable<Funcionario> {
    // O ID do funcionário deve ser passado na URL (convenção RESTful)
    return this.http.put<Funcionario>(`${API_URL}/${funcionario.id}`, funcionario);
  }

  /**
   * Exclui um funcionário pelo ID (DELETE /api/Funcionario/{id}).
   * @param id ID do funcionário a ser excluído.
   * @returns Observable<any> (Geralmente uma resposta vazia ou de sucesso)
   */
  excluir(id: number): Observable<any> {
    return this.http.delete(`${API_URL}/${id}`);
  }
}