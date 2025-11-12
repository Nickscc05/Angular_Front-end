import { Component, OnInit } from '@angular/core';
import { GetProdutoEstoqueCriticoDTO } from '../../modelos/DTO/GetProdutoEstoqueCriticoDTO.model';
import { ProdutoService } from '../../servicos/produto/produto.service';
import { FinanceiroService } from '../../servicos/financeiro/financeiro.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})

export class HomePageComponent implements OnInit {

  public alertasEstoque: GetProdutoEstoqueCriticoDTO[] = [];
  public carregandoAlertas: boolean = true;
  public erroCarregamento: string | null = null;
  public lucroSemanal: number = 0.00;
  public gastosMensais: number = 0.00;
  public vendasDiarias: number = 0.00;



  constructor(private produtoService: ProdutoService, private financeiroService: FinanceiroService) { } // Injeção de dependência do serviço ProdutoService

  ngOnInit(): void {
    this.carregarEstoqueCritico();
    this.carregarLucroSemanal();
    this.carregarGastosMensais();
    this.carregarVendasDiarias();
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

  carregarLucroSemanal() {
    this.financeiroService.obterLucroSemanal().subscribe({
      next: (lucro) => {
        // O valor retornado (ex: 1000.00) é armazenado aqui
        this.lucroSemanal = lucro;
        this.carregandoAlertas = false;
      },
      error: (err) => {
        console.error('Erro ao buscar lucro semanal:', err);
        this.carregandoAlertas = false;
        // Lógica para mostrar uma mensagem de erro ao usuário, se necessário
      }
    });
  }

  carregarGastosMensais(): void {
    this.financeiroService.obterGastosMensais().subscribe({
      next: (gastos) => {
        this.gastosMensais = gastos;
        this.carregandoAlertas = false;
      },
      error: (err) => {
        console.error('Erro ao buscar gastos mensais:', err);
        this.carregandoAlertas = false;
      }
    });
  }
  carregarVendasDiarias(): void {
    this.financeiroService.obterVendasDiarias().subscribe({
      next: (vendas) => {
        // Armazene ou utilize o valor de vendas diárias conforme necessário
        this.vendasDiarias = vendas;
        this.carregandoAlertas = false;
      },
      error: (err) => {
        console.error('Erro ao buscar vendas diárias:', err);
        this.carregandoAlertas = false;
      }
    });
  }

}
