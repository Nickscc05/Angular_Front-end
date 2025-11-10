import { Component } from '@angular/core';
import { GetProdutoEstoqueCriticoDTO } from '../../modelos/DTO/GetProdutoEstoqueCriticoDTO.model';
import { ProdutoService } from '../../servicos/produto/produto.service';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [],
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})

export class HomePageComponent {

  public alertasEstoque: GetProdutoEstoqueCriticoDTO[] = [];
  public carregandoAlertas: boolean = true;
  public erroCarregamento: string | null = null;

  constructor(private produtoService: ProdutoService) {} // Injeção de dependência do serviço ProdutoService

  ngOnInit(): void {
    this.carregarEstoqueCritico();
  }

  carregarEstoqueCritico(): void {

    this.carregandoAlertas = true;
    this.erroCarregamento = null;

    // Chame o método do serviço
    this.produtoService.getEstoqueCritico().subscribe({
        next: (data) => {
            this.alertasEstoque = data;
            this.carregandoAlertas = false;
        },
        error: (error) => {
            console.error('Erro ao carregar estoque crítico:', error);
            this.erroCarregamento = 'Não foi possível carregar os alertas de estoque.';
            this.carregandoAlertas = false;
        }
    });
  }

}
