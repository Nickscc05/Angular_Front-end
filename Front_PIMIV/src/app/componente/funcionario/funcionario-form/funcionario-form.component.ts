import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { finalize } from 'rxjs';
import { FuncionarioService } from '../../../servicos/funcionario/funcionario.service';
import { NotificationService } from '../../../servicos/shared/notification.service';
import { ErrorHandlerService } from '../../../servicos/shared/error-handler.service';
import { PostFuncionarioDTO } from '../../../modelos/Funcionario/PostFuncionarioDTO.model';
import { PutFuncionarioDTO } from '../../../modelos/Funcionario/PutFuncionarioDTO.model';
import { GetFuncionarioDTO } from '../../../modelos/Funcionario/GetFuncionarioDTO';

@Component({
    selector: 'app-funcionario-form',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './funcionario-form.component.html',
    styleUrls: ['./funcionario-form.component.css']
})
export class FuncionarioFormComponent implements OnInit, OnChanges {
    @Input() funcionarioId: number | null = null;
    @Output() close = new EventEmitter<boolean>();

    funcionario: PostFuncionarioDTO = this.criarFormularioVazio();
    ativo = true;
    enviando = false;
    carregando = false;

    constructor(
        private funcionarioService: FuncionarioService,
        private notification: NotificationService,
        private errorHandler: ErrorHandlerService
    ) {}

    ngOnInit(): void {
        if (this.funcionarioId) {
            this.carregarFuncionario(this.funcionarioId);
        }
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['funcionarioId'] && !changes['funcionarioId'].firstChange) {
            if (this.funcionarioId) {
                this.carregarFuncionario(this.funcionarioId);
            } else {
                this.resetarFormulario();
            }
        }
    }

    private carregarFuncionario(id: number): void {
        this.carregando = true;
        this.funcionarioService.obterPorId(id).subscribe({
            next: (func: GetFuncionarioDTO) => {
                this.funcionario = {
                    nome: func.nome,
                    cpf: func.cpf,
                    rg: func.rg,
                    telefone: func.telefone,
                    telefoneExtra: func.telefoneExtra ?? '',
                    email: func.email,
                    contaBancaria: func.contaBancaria,
                    agenciaBancaria: func.agenciaBancaria
                };
                this.ativo = func.ativo;
                this.carregando = false;
            },
            error: (err) => {
                this.handleError(err, 'Erro ao carregar funcionário');
                this.close.emit(false);
            }
        });
    }

    onSubmit(): void {
        if (this.enviando) {
            return;
        }

        if (!this.camposObrigatoriosPreenchidos()) {
            this.notification.erro('Preencha todos os campos obrigatórios.');
            return;
        }

        this.enviando = true;
        const finalizar = () => (this.enviando = false);

        if (this.funcionarioId) {
            const putDto: PutFuncionarioDTO = {
                Id: this.funcionarioId,
                nome: this.funcionario.nome,
                cpf: this.funcionario.cpf,
                rg: this.funcionario.rg,
                telefone: this.funcionario.telefone,
                telefoneExtra: this.funcionario.telefoneExtra,
                email: this.funcionario.email,
                contaBancaria: this.funcionario.contaBancaria,
                agenciaBancaria: this.funcionario.agenciaBancaria,
                ativo: this.ativo
            };

            this.funcionarioService
                .atualizar(this.funcionarioId, putDto)
                .pipe(finalize(finalizar))
                .subscribe({
                    next: () => {
                        this.notification.sucesso('Funcionário atualizado com sucesso!');
                        this.resetarFormulario();
                        this.close.emit(true);
                    },
                    error: (err) => {
                        this.notification.erro(this.errorHandler.extrairMensagemErro(err, 'Erro ao atualizar funcionário'));
                    }
                });
        } else {
            this.funcionarioService
                .criar(this.funcionario)
                .pipe(finalize(finalizar))
                .subscribe({
                    next: () => {
                        this.notification.sucesso('Funcionário criado com sucesso!');
                        this.resetarFormulario();
                        this.close.emit(true);
                    },
                    error: (err) => {
                        this.notification.erro(this.errorHandler.extrairMensagemErro(err, 'Erro ao criar funcionário'));
                    }
                });
        }
    }

    cancelar(): void {
        this.close.emit(false);
    }

    private camposObrigatoriosPreenchidos(): boolean {
        return !!(
            this.funcionario.nome?.trim() &&
            this.funcionario.cpf?.trim() &&
            this.funcionario.rg?.trim() &&
            this.funcionario.telefone?.trim() &&
            this.funcionario.email?.trim() &&
            this.funcionario.contaBancaria?.trim() &&
            this.funcionario.agenciaBancaria?.trim()
        );
    }

    private handleError(err: unknown, mensagem: string): void {
        console.error(mensagem, err);
        this.notification.erro(this.errorHandler.extrairMensagemErro(err, mensagem));
        this.carregando = false;
    }

    private criarFormularioVazio(): PostFuncionarioDTO {
        return {
            nome: '',
            cpf: '',
            rg: '',
            telefone: '',
            telefoneExtra: '',
            email: '',
            contaBancaria: '',
            agenciaBancaria: ''
        };
    }

    private resetarFormulario(): void {
        this.funcionario = this.criarFormularioVazio();
        this.ativo = true;
        this.carregando = false;
    }
}
