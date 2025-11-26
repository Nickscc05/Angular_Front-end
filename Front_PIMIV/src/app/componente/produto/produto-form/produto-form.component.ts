import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProdutoService } from '../../../servicos/produto/produto.service';
import { CategoriaService } from '../../../servicos/categoria/categoria.service';
import { UnidadeMedidaService } from '../../../servicos/unidade-medida/unidade-medida.service.service';
import { NotificationService } from '../../../servicos/shared/notification.service';
import { ErrorHandlerService } from '../../../servicos/shared/error-handler.service';
import { Categoria } from '../../../modelos/Categoria/Categoria.model';
import { UnidadeMedida } from '../../../modelos/UnidadeMedida/UnidadeMedida.model';
import { PostProdutoDTO } from '../../../modelos/Produto/PostProdutoDTO.model';
import { PutProdutoDTO } from '../../../modelos/Produto/PutProdutoDTO.models';
import { GetProdutoDTO } from '../../../modelos/Produto/GetProdutoDTO';
import { finalize, forkJoin } from 'rxjs';

@Component({
    selector: 'app-produto-form',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './produto-form.component.html',
    styleUrls: ['./produto-form.component.css']
})
export class ProdutoFormComponent implements OnInit, OnChanges {
    @Input() produtoId: number | null = null;
    @Output() close = new EventEmitter<boolean>(); // Emite true se salvou, false se cancelou

    categorias: Categoria[] = [];
    unidades: UnidadeMedida[] = [];

    produto: PostProdutoDTO = this.criarProdutoVazio();
    
    ativo: boolean = true;

    enviando = false;
    carregando = true;

    constructor(
        private produtoService: ProdutoService,
        private categoriaService: CategoriaService,
        private unidadeService: UnidadeMedidaService,
        private notification: NotificationService,
        private errorHandler: ErrorHandlerService
    ) { }

    ngOnInit(): void {
        this.carregarDependencias();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['produtoId'] && !changes['produtoId'].firstChange) {
            if (this.produtoId) {
                this.carregando = true;
                if (this.categorias.length && this.unidades.length) {
                    this.carregarProduto(this.produtoId);
                } else {
                    this.carregarDependencias();
                }
            } else {
                this.resetarFormulario();
            }
        }
    }

    private carregarDependencias(): void {
        this.carregando = true;

        forkJoin({
            categorias: this.categoriaService.obterTodas(),
            unidades: this.unidadeService.obterTodas()
        }).subscribe({
            next: (res) => {
                this.categorias = res.categorias;
                this.unidades = res.unidades;
                
                if (this.produtoId) {
                    this.carregarProduto(this.produtoId);
                } else {
                    this.resetarFormulario();
                    this.carregando = false;
                }
            },
            error: (err) => this.handleError(err, 'Erro ao carregar dependências')
        });
    }

    private carregarProduto(id: number): void {
        this.produtoService.obterProdutoPorId(id).subscribe({
            next: (prod: GetProdutoDTO) => {
                this.produto = {
                    nome: prod.nome,
                    codigo: prod.codigo,
                    descricao: prod.descricao ?? '',
                    preco: prod.preco ?? 0,
                    quantidadeMinima: prod.quantidadeMinima ?? 0,
                    categoriaId: prod.categoriaId ?? prod.categoria?.id ?? 0,
                    unidadeMedidaId: prod.unidadeMedida?.id ?? 0
                };
                this.ativo = prod.ativo;
                this.carregando = false;
            },
            error: (err) => {
                this.handleError(err, 'Erro ao carregar produto');
                this.close.emit(false);
            }
        });
    }

    onSubmit(): void {
        if (this.enviando) return;

        // Validação básica
        if (!this.produto.nome || !this.produto.codigo || !this.produto.preco || !this.produto.categoriaId || !this.produto.unidadeMedidaId) {
            this.notification.erro('Preencha todos os campos obrigatórios.');
            return;
        }

        this.enviando = true;
        const finalizar = () => this.enviando = false;

        if (this.produtoId) {
            const putDto: PutProdutoDTO = {
                idProduto: this.produtoId,
                nome: this.produto.nome,
                codigo: this.produto.codigo,
                categoriaId: this.produto.categoriaId,
                unidadeMedidaId: this.produto.unidadeMedidaId,
                preco: this.produto.preco,
                quantidadeMinima: this.produto.quantidadeMinima,
                descricao: this.produto.descricao,
                ativo: this.ativo
            };

            this.produtoService.atualizarProduto(this.produtoId, putDto)
                .pipe(finalize(finalizar))
                .subscribe({
                    next: () => {
                        this.notification.sucesso('Produto atualizado com sucesso!');
                        this.close.emit(true);
                    },
                    error: (err) => {
                        this.notification.erro(this.errorHandler.extrairMensagemErro(err, 'Erro ao atualizar produto'));
                    }
                });
        } else {
            this.produtoService.criarProduto(this.produto)
                .pipe(finalize(finalizar))
                .subscribe({
                    next: () => {
                        this.notification.sucesso('Produto criado com sucesso!');
                        this.close.emit(true);
                    },
                    error: (err) => {
                        this.notification.erro(this.errorHandler.extrairMensagemErro(err, 'Erro ao criar produto'));
                    }
                });
        }
    }

    cancelar(): void {
        this.close.emit(false);
    }

    private handleError(err: any, msg: string): void {
        console.error(msg, err);
        this.notification.erro(this.errorHandler.extrairMensagemErro(err, msg));
        this.carregando = false;
    }

    private criarProdutoVazio(): PostProdutoDTO {
        return {
            nome: '',
            codigo: '',
            descricao: '',
            preco: 0,
            quantidadeMinima: 0,
            categoriaId: 0,
            unidadeMedidaId: 0
        };
    }

    private resetarFormulario(): void {
        this.produto = this.criarProdutoVazio();
        this.ativo = true;
    }
}
