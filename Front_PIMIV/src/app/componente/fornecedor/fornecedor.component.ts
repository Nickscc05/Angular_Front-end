import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FornecedorService } from '../../servicos/fornecedor/fornecedor.service';
import { NotificationService } from '../../servicos/shared/notification.service';
import { ErrorHandlerService } from '../../servicos/shared/error-handler.service';
import { GetFornecedorDTO } from '../../modelos/Fornecedor/GetFornecedor.model';
import { FornecedorFormComponent } from './fornecedor-form/fornecedor-form.component';

@Component({
  selector: 'app-fornecedor',
  standalone: true,
  imports: [CommonModule, FornecedorFormComponent],
  templateUrl: './fornecedor.component.html',
  styleUrls: ['./fornecedor.component.css']
})
export class FornecedorComponent implements OnInit {
  listaFornecedores: GetFornecedorDTO[] = [];
  carregando = false;
  mostrarModal = false;
  fornecedorIdParaEditar: number | null = null;

  constructor(
    private fornecedorService: FornecedorService,
    private notification: NotificationService,
    private errorHandler: ErrorHandlerService
  ) {}

  ngOnInit(): void {
    this.obterFornecedores();
  }

  obterFornecedores(): void {
    this.carregando = true;
    this.fornecedorService.obterTodosOsFornecedores().subscribe({
      next: (fornecedores) => {
        this.listaFornecedores = fornecedores;
        this.carregando = false;
        console.log('Fornecedores carregados:', fornecedores);
      },
      error: (erro) => {
        console.error('Erro ao obter fornecedores:', erro);
        this.notification.erro(this.errorHandler.extrairMensagemErro(erro, 'Erro ao carregar fornecedores.'));
        this.carregando = false;
      }
    });
  }

  abrirModalCriacao(): void {
    this.fornecedorIdParaEditar = null;
    this.mostrarModal = true;
  }

  abrirModalEdicao(fornecedor: GetFornecedorDTO): void {
    this.fornecedorIdParaEditar = fornecedor.id;
    this.mostrarModal = true;
  }

  fecharModal(atualizarLista: boolean): void {
    this.mostrarModal = false;
    this.fornecedorIdParaEditar = null;
    if (atualizarLista) {
      this.obterFornecedores();
    }
  }

  excluir(id: number): void {
    if (!confirm('Tem certeza que deseja excluir este fornecedor?')) {
      return;
    }

    this.carregando = true;
    this.fornecedorService.deletarFornecedor(id).subscribe({
      next: () => {
        this.notification.sucesso('Fornecedor excluído com sucesso.');
        this.obterFornecedores();
      },
      error: (erro) => {
        console.error('Erro ao excluir fornecedor:', erro);
        this.notification.erro(this.errorHandler.extrairMensagemErro(erro, 'Erro ao excluir fornecedor.'));
      },
      complete: () => {
        this.carregando = false;
      }
    });
  }
}
