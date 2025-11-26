import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FuncionarioService } from '../../servicos/funcionario/funcionario.service';
import { NotificationService } from '../../servicos/shared/notification.service';
import { ErrorHandlerService } from '../../servicos/shared/error-handler.service';
import { GetFuncionarioDTO } from '../../modelos/Funcionario/GetFuncionarioDTO';
import { FuncionarioFormComponent } from './funcionario-form/funcionario-form.component';

@Component({
  selector: 'app-funcionario',
  standalone: true,
  imports: [CommonModule, FuncionarioFormComponent],
  templateUrl: './funcionario.component.html',
  styleUrls: ['./funcionario.component.css']
})
export class FuncionarioComponent implements OnInit {
  listaFuncionarios: GetFuncionarioDTO[] = [];
  carregando = false;
  mostrarModal = false;
  funcionarioIdParaEditar: number | null = null;

  constructor(
    private funcionarioService: FuncionarioService,
    private notification: NotificationService,
    private errorHandler: ErrorHandlerService
  ) {}

  ngOnInit(): void {
    this.obterFuncionarios();
  }

  obterFuncionarios(): void {
    this.carregando = true;
    this.funcionarioService.obterTodos().subscribe({
      next: (funcionarios) => {
        this.listaFuncionarios = funcionarios;
        this.carregando = false;
      },
      error: (erro) => {
        console.error('Erro ao obter funcionários:', erro);
        this.notification.erro(this.errorHandler.extrairMensagemErro(erro, 'Erro ao carregar funcionários.'));
        this.carregando = false;
      }
    });
  }

  abrirModalCriacao(): void {
    this.funcionarioIdParaEditar = null;
    this.mostrarModal = true;
  }

  abrirModalEdicao(funcionario: GetFuncionarioDTO): void {
    this.funcionarioIdParaEditar = funcionario.id;
    this.mostrarModal = true;
  }

  fecharModal(atualizarLista: boolean): void {
    this.mostrarModal = false;
    this.funcionarioIdParaEditar = null;
    if (atualizarLista) {
      this.obterFuncionarios();
    }
  }

  excluir(id: number): void {
    if (!confirm('Tem certeza que deseja excluir este funcionário?')) {
      return;
    }

    this.carregando = true;
    this.funcionarioService.deletar(id).subscribe({
      next: () => {
        this.notification.sucesso('Funcionário excluído com sucesso.');
        this.obterFuncionarios();
      },
      error: (erro) => {
        console.error('Erro ao excluir funcionário:', erro);
        this.notification.erro(this.errorHandler.extrairMensagemErro(erro, 'Erro ao excluir funcionário.'));
      },
      complete: () => {
        this.carregando = false;
      }
    });
  }
}
