import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { GetFornecedorDTO } from '../../modelos/Fornecedor/GetFornecedor.model';
import { HttpClient } from '@angular/common/http';
import { PutFornecedorDTO } from '../../modelos/Fornecedor/PutFornecedorDTO.model';
import { FornecedorComListaProdutosDTO } from '../../modelos/Fornecedor/FornecedorComListaProdutosDTO.model';
import { PostFornecedorDTO } from '../../modelos/Fornecedor/PostFornecedorDTO.model';

@Injectable({
  providedIn: 'root',
})
export class FornecedorService {

  private readonly url = 'http://localhost:5030/api/Fornecedor';

  constructor(private http: HttpClient) { }

  /* *
   * Busca todos os fornecedores.
   * @returns Um Observable com um array de GetFornecedorDTO.
   */
  obterTodosOsFornecedores(): Observable<GetFornecedorDTO[]> {
    return this.http.get<GetFornecedorDTO[]>(this.url);
  }

  /* *
   * Busca um fornecedor específico pelo seu ID.
   * @param id O ID do fornecedor a ser buscado.
   * @returns Um Observable com o GetFornecedorDTO correspondente.
   */
  obterFornecedorPorId(id: number): Observable<GetFornecedorDTO> {
    const url = `${this.url}/${id}`;
    return this.http.get<GetFornecedorDTO>(url);
  }

  /* *
   * Busca a lista de produtos de um fornecedor específico.
   * @param id O ID do fornecedor.
   * @returns Um Observable com o FornecedorComListaProdutosDTO.
   */
  obterProdutosPorFornecedorId(id: number): Observable<FornecedorComListaProdutosDTO> {
    const url = `${this.url}/${id}/produtos`;
    return this.http.get<FornecedorComListaProdutosDTO>(url);
  }

  /* *
   * Cria um novo fornecedor.
   * @param fornecedor O objeto PostFornecedorDTO com os dados do novo fornecedor.
   * @returns Um Observable com o GetFornecedorDTO do fornecedor recém-criado.
   */
  criarFornecedor(fornecedor: PostFornecedorDTO): Observable<GetFornecedorDTO> {
    return this.http.post<GetFornecedorDTO>(this.url, fornecedor);
  }

  /* *
   * Atualiza um fornecedor existente.
   * @param id O ID do fornecedor a ser atualizado.
   * @param fornecedor O objeto PutFornecedorDTO com os dados atualizados.
   * @returns Um Observable que completa quando a operação é bem-sucedida.
   */
  atualizarFornecedor(id: number, fornecedor: PutFornecedorDTO): Observable<void> {
    const url = `${this.url}/${id}`;
    return this.http.put<void>(url, fornecedor);
  }

  /* *
   * Deleta um fornecedor existente.
   * @param id O ID do fornecedor a ser deletado.
   * @returns Um Observable que completa quando a operação é bem-sucedida.
   */
  deletarFornecedor(id: number): Observable<void> {
    const url = `${this.url}/${id}`;
    return this.http.delete<void>(url);
  }
}
