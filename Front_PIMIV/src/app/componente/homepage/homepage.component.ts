import { Component, OnInit } from '@angular/core';
import { GetProdutoEstoqueCriticoDTO } from '../../modelos/DTO/GetProdutoEstoqueCriticoDTO.model';
import { ProdutoService } from '../../servicos/produto/produto.service';
import { FinanceiroService, Entrada } from '../../servicos/financeiro/financeiro.service';
import { CommonModule, CurrencyPipe, DecimalPipe } from '@angular/common';
import { finalize } from 'rxjs';
import { ErrorHandlerService } from '../../servicos/shared/error-handler.service';
import { NotificationService } from '../../servicos/shared/notification.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [CommonModule, FormsModule, CurrencyPipe, DecimalPipe],
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
  public entradasRecentes: Entrada[] = [];
  public isLoadingEntradas: boolean = false;
  public dataDash: string = ''; // Propriedade para o data picker

  constructor(
    private produtoService: ProdutoService,
    private financeiroService: FinanceiroService,
    private errorHandler: ErrorHandlerService,
    private notification: NotificationService
  ) { }

  ngOnInit(): void {
    // Definir data atual para o input date
    this.dataDash = new Date().toISOString().split('T')[0];

    this.carregarEstoqueCritico();
    this.carregarLucroSemanal();
    this.carregarGastosMensais();
    this.carregarVendasDiarias();
    this.carregarEntradasRecentes();
  }

  carregarEstoqueCritico(): void {
    this.carregandoAlertas = true;
    this.erroCarregamento = null;

    this.produtoService.getEstoqueCritico().subscribe({
      next: (data) => {
        this.alertasEstoque = data;
        this.carregandoAlertas = false;
      },
      error: (error) => {
        console.error('Erro ao carregar estoque crítico:', error);
        this.erroCarregamento = this.errorHandler.extrairMensagemErro(error, 'Não foi possível carregar os alertas de estoque.');
        this.notification.erro('Falha ao carregar dados do dashboard.');
        this.carregandoAlertas = false;
      }
    });
  }

  carregarLucroSemanal() {
    this.financeiroService.obterLucroSemanal().subscribe({
      next: (lucro) => {
        this.lucroSemanal = lucro;
      },
      error: (err) => {
        console.error('Erro ao buscar lucro semanal:', err);
      }
    });
  }

  carregarGastosMensais(): void {
    this.financeiroService.obterGastosMensais().subscribe({
      next: (gastos) => {
        this.gastosMensais = gastos;
      },
      error: (err) => {
        console.error('Erro ao buscar gastos mensais:', err);
      }
    });
  }

  carregarVendasDiarias(): void {
    this.financeiroService.obterVendasDiarias().subscribe({
      next: (vendas) => {
        this.vendasDiarias = vendas;
      },
      error: (err) => {
        console.error('Erro ao buscar vendas diárias:', err);
      }
    });
  }

  carregarEntradasRecentes() {
    this.isLoadingEntradas = true;
    this.financeiroService.obterEntradasRecentes(6)
      .pipe(finalize(() => this.isLoadingEntradas = false))
      .subscribe({
        next: (dados) => {
          this.entradasRecentes = dados;
        },
        error: (err) => {
          console.error('Erro ao obter entradas recentes:', err);
          this.notification.erro(this.errorHandler.extrairMensagemErro(err, 'Erro ao obter entradas recentes.'));
          this.entradasRecentes = [];
        }
      });
  }
}
