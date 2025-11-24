
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';     
import { CommonModule } from '@angular/common';


// Interface para definir o formato do objeto Usuário (Funcionário)
interface Usuario {
  id: number;
  nome: string;
  cpf: string;
  cargo: string;
  email: string;
  telefone: string;
  numeroConta: string;
  status: 'Ativo' | 'Inativo';
  etnia: string;
  // Campos de segurança (opcionais na edição)
  senha?: string;
  confirmaSenha?: string; 
}

@Component({
  selector: 'app-funcionario', // Mantendo o seletor atual
  standalone: true,
  imports: [
      FormsModule, 
      CommonModule // (Necessário para @if, @for e outras diretivas estruturais)
  ], 
  templateUrl: './funcionario.component.html',
  styleUrls: ['./funcionario.component.css']
})
export class FuncionarioComponent implements OnInit {
  
  // Lista que será exibida na tabela
  listaUsuarios: Usuario[] = [];
  
  // Modelo para o formulário de Cadastro/Edição, ligado via [(ngModel)]
  novoUsuario: Usuario = this.criarNovoModelo();
  
  // Estado do Componente
  editandoId: number | null = null; // ID do usuário sendo editado, ou nulo para cadastro
  enviando: boolean = false; // Indica se uma requisição à API está em andamento

  constructor() {}

  ngOnInit(): void {
    // Carrega os dados iniciais ao iniciar o componente
    this.carregarUsuarios(); 
  }

  // --- MÉTODOS DE CONTROLE DE ESTADO ---

  /**
   * Cria e retorna o modelo padrão de um novo usuário para limpar o formulário.
   */
  criarNovoModelo(): Usuario {
    return {
      id: 0,
      nome: '',
      cpf: '',
      cargo: 'Vendedor',
      email: '',
      telefone: '',
      numeroConta: '',
      status: 'Ativo',
      etnia: 'Pardo',
      senha: '',
      confirmaSenha: ''
    };
  }
  
  /**
   * Simula o carregamento da lista de usuários (GET /api/Funcionario).
   */
  carregarUsuarios() {
    // Mock Data (Simulação)
    this.listaUsuarios = [
      { id: 1, nome: 'Alexandre Silva', cpf: '111.111.111-11', cargo: 'Gerente', email: 'alex@horti.com', telefone: '(61) 9999-0000', numeroConta: '12345', status: 'Ativo', etnia: 'Pardo' },
      { id: 2, nome: 'Bruna Mendes', cpf: '222.222.222-22', cargo: 'Vendedor', email: 'bruna@horti.com', telefone: '(11) 9888-1111', numeroConta: '67890', status: 'Ativo', etnia: 'Branco' },
    ];
  }

  // --- LÓGICA DE EDIÇÃO E SUBMISSÃO ---
  
  /**
   * Inicia o modo de edição, preenchendo o formulário com os dados do usuário.
   */
  iniciarEdicao(usuario: Usuario) {
    this.editandoId = usuario.id;
    // Cria uma cópia profunda dos dados para evitar editar o objeto na lista
    this.novoUsuario = { ...usuario, senha: '', confirmaSenha: '' }; 
  }

  /**
   * Cancela o modo de edição e limpa o formulário.
   */
  cancelarEdicao() {
    this.editandoId = null;
    this.novoUsuario = this.criarNovoModelo();
  }

  /**
   * Lida com a submissão do formulário (Cadastro ou Edição).
   */
  onSubmit() {
    this.enviando = true;
    
    // Simulação de validação de senha (Apenas no cadastro)
    if (!this.editandoId && this.novoUsuario.senha !== this.novoUsuario.confirmaSenha) {
      alert('A senha e a confirmação de senha não coincidem!');
      this.enviando = false;
      return;
    }
    
    if (this.editandoId) {
      // Lógica de EDIÇÃO (PUT /api/Funcionario/{id})
      console.log('Dados prontos para EDIÇÃO:', this.novoUsuario);
    } else {
      // Lógica de CADASTRO (POST /api/Funcionario)
      console.log('Dados prontos para CADASTRO:', this.novoUsuario);
    }
    
    // Simulação de delay da API
    setTimeout(() => {
      this.enviando = false;
      alert(`Usuário ${this.editandoId ? 'editado' : 'cadastrado'} com sucesso!`);
      
      // Limpa e reseta o estado
      this.novoUsuario = this.criarNovoModelo();
      this.editandoId = null;
      this.carregarUsuarios(); // Atualiza a lista
    }, 1500);
  }

  // --- LÓGICA DE EXCLUSÃO ---

  excluir(id: number) {
    if (confirm('Tem certeza que deseja excluir este funcionário? Esta ação é irreversível.')) {
      this.enviando = true;
      // Lógica de exclusão (DELETE /api/Funcionario/{id})
      
      // Simulação:
      setTimeout(() => {
        this.listaUsuarios = this.listaUsuarios.filter(u => u.id !== id);
        this.enviando = false;
        alert('Funcionário excluído com sucesso!');
      }, 1000);
    }
  }
}
