import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { GetProdutoDTO } from "../../modelos/Produto/GetProdutoDTO";
import { GetProdutoEstoqueCriticoDTO } from "../../modelos/DTO/GetProdutoEstoqueCriticoDTO.model";
import { PostProdutoDTO } from "../../modelos/Produto/PostProdutoDTO.model";
import { PutProdutoDTO } from "../../modelos/Produto/PutProdutoDTO.models";
import { ProdutoComListaDeFornecedoresDTO } from "../../modelos/Produto/ProdutoComListaDeFornecedoresDTO.model";



@Injectable({
  providedIn: 'root'
})

export class ProdutoService {
  private readonly url = 'http://localhost:5030/api/Produto'; // Adjust the base URL as needed

  constructor(private http: HttpClient) { }

  /**
   * Fetches a list of all products.
   * Corresponds to: GET /api/Produto
   */
  obterTodosOsProdutos(): Observable<GetProdutoDTO[]> {
    return this.http.get<GetProdutoDTO[]>(this.url);
  }

  /**
   * Fetches a list of products with current stock less than or equal to the minimum quantity.
   * Corresponds to: GET /api/Produto/estoque-critico
   */
  obterProdutosComEstoqueCritico(): Observable<GetProdutoEstoqueCriticoDTO[]> {
    return this.http.get<GetProdutoEstoqueCriticoDTO[]>(`${this.url}/estoque-critico`);
  }

  /**
   * Fetches a specific product by its ID.
   * @param id The ID of the product.
   * Corresponds to: GET /api/Produto/{id}
   */
  obterProdutoPorId(id: number): Observable<GetProdutoDTO> {
    return this.http.get<GetProdutoDTO>(`${this.url}/${id}`);
  }

  /**
   * Fetches a specific product by its code (e.g., barcode).
   * @param codigo The code of the product.
   * Corresponds to: GET /api/Produto/codigo/{codigo}
   */
  obterProdutoPorCodigo(codigo: string): Observable<GetProdutoDTO> {
    return this.http.get<GetProdutoDTO>(`${this.url}/codigo/${codigo}`);
  }

  /**
   * Fetches a product along with a list of suppliers who supply it.
   * @param produtoId The ID of the product.
   * Corresponds to: GET /api/Produto/{produtoId}/fornecedores
   */
  obterFornecedoresPorProdutoId(produtoId: number): Observable<ProdutoComListaDeFornecedoresDTO> {
    return this.http.get<ProdutoComListaDeFornecedoresDTO>(`${this.url}/${produtoId}/fornecedores`);
  }

  /**
   * Creates a new product.
   * @param produto The data for the new product.
   * Corresponds to: POST /api/Produto
   */
  criarProduto(produto: PostProdutoDTO): Observable<GetProdutoDTO> {
    return this.http.post<GetProdutoDTO>(this.url, produto);
  }

  /**
   * Updates an existing product.
   * @param id The ID of the product to update.
   * @param produto The updated data for the product.
   * Corresponds to: PUT /api/Produto/{id}
   */
  atualizarProduto(id: number, produto: PutProdutoDTO): Observable<void> {
    return this.http.put<void>(`${this.url}/${id}`, produto);
  }

  /**
   * Deletes an existing product.
   * @param id The ID of the product to delete.
   * Corresponds to: DELETE /api/Produto/{id}
   */
  deletarProduto(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}