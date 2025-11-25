import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { finalize } from 'rxjs';
import { FornecedorService } from '../../../servicos/fornecedor/fornecedor.service';
import { NotificationService } from '../../../servicos/shared/notification.service';
import { ErrorHandlerService } from '../../../servicos/shared/error-handler.service';
import { PostFornecedorDTO } from '../../../modelos/Fornecedor/PostFornecedorDTO.model';
import { PutFornecedorDTO } from '../../../modelos/Fornecedor/PutFornecedorDTO.model';
import { GetFornecedorDTO } from '../../../modelos/Fornecedor/GetFornecedor.model';

@Component({
    selector: 'app-fornecedor-form',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './fornecedor-form.component.html',
    styleUrls: ['./fornecedor-form.component.css']
})
export class FornecedorFormComponent implements OnInit, OnChanges {
    @Input() fornecedorId: number | null = null;
    @Output() close = new EventEmitter<boolean>();

    fornecedor: PostFornecedorDTO = this.criarFormularioVazio();
    ativo = true;
    enviando = false;
    carregando = false;

    constructor(
        private fornecedorService: FornecedorService,
        private notification: NotificationService,
        private errorHandler: ErrorHandlerService
    ) {}

    ngOnInit(): void {
        if (this.fornecedorId) {
            this.carregarFornecedor(this.fornecedorId);
        }
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['fornecedorId'] && !changes['fornecedorId'].firstChange) {
            if (this.fornecedorId) {
                this.carregarFornecedor(this.fornecedorId);
            } else {
                this.resetarFormulario();
            }
        }
    }

    private carregarFornecedor(id: number): void {
        this.carregando = true;
        this.fornecedorService.obterFornecedorPorId(id).subscribe({
            next: (fornecedorDto: GetFornecedorDTO) => {
                this.fornecedor = {
                    nomeFantasia: fornecedorDto.nome,
                    cadastroPessoa: fornecedorDto.cadastroPessoa,
                    telefone: fornecedorDto.telefone,
                    telefoneExtra: fornecedorDto.telefoneExtra ?? '',
                    email: fornecedorDto.email,
                };
                this.ativo = fornecedorDto.ativo;
                this.carregando = false;
            },
            error: (err) => {
                this.handleError(err, 'Erro ao carregar fornecedor');
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

        if (this.fornecedorId) {
            const putDto: PutFornecedorDTO = {
                id: this.fornecedorId,
                nomeFantasia: this.fornecedor.nomeFantasia,
                cadastroPessoa: this.fornecedor.cadastroPessoa,
                telefone: this.fornecedor.telefone,
                telefoneExtra: this.fornecedor.telefoneExtra,
                email: this.fornecedor.email,
                ativo: this.ativo
            };

            this.fornecedorService
                .atualizarFornecedor(this.fornecedorId, putDto)
                .pipe(finalize(finalizar))
                .subscribe({
                    next: () => {
                        this.notification.sucesso('Fornecedor atualizado com sucesso!');
                        this.resetarFormulario();
                        this.close.emit(true);
                    },
                    error: (err) => {
                        this.notification.erro(this.errorHandler.extrairMensagemErro(err, 'Erro ao atualizar fornecedor'));
                    }
                });
        } else {
            this.fornecedorService
                .criarFornecedor(this.fornecedor)
                .pipe(finalize(finalizar))
                .subscribe({
                    next: () => {
                        this.notification.sucesso('Fornecedor criado com sucesso!');
                        this.resetarFormulario();
                        this.close.emit(true);
                    },
                    error: (err) => {
                        this.notification.erro(this.errorHandler.extrairMensagemErro(err, 'Erro ao criar fornecedor'));
                    }
                });
        }
    }

    cancelar(): void {
        this.close.emit(false);
    }

    private camposObrigatoriosPreenchidos(): boolean {
        return !!(
            this.fornecedor.nomeFantasia?.trim() &&
            this.fornecedor.cadastroPessoa?.trim() &&
            this.fornecedor.telefone?.trim() &&
            this.fornecedor.email?.trim()
        );
    }

    private handleError(err: unknown, mensagem: string): void {
        console.error(mensagem, err);
        this.notification.erro(this.errorHandler.extrairMensagemErro(err, mensagem));
        this.carregando = false;
    }

    private criarFormularioVazio(): PostFornecedorDTO {
        return {
            nomeFantasia: '',
            cadastroPessoa: '',
            telefone: '',
            telefoneExtra: '',
            email: '',
        };
    }

    private resetarFormulario(): void {
        this.fornecedor = this.criarFormularioVazio();
        this.ativo = true;
        this.carregando = false;
    }
}
