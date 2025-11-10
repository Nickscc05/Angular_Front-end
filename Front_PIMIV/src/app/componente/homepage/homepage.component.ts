import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

// Interface interna para representar os alertas de estoque
export interface AlertaEstoque {
  nome: string;
  codigo: string;
  estoqueAtual: number;
  estoqueMinimo: number;
}

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [],
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})

export class HomePageComponent {

  public alertasEstoque: AlertaEstoque[] = [];
  public carregandoAlertas: boolean = true;
  public erroCarregamento: string | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.carregarAlertasEstoque();
  }

  carregarAlertasEstoque(): void {
    
    this.carregandoAlertas = true;
    this.erroCarregamento = null;

    const apiUrl = 'localhost:5030/produtos/alertas-estoque';
  }

}
