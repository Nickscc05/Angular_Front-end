import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FuncionarioComponent } from './funcionario.component';
import { FormsModule } from '@angular/forms'; // Necessário para testar [(ngModel)]
import { CommonModule } from '@angular/common'; // Necessário para testar @if e outros

describe('FuncionarioComponent', () => {
  let component: FuncionarioComponent;
  let fixture: ComponentFixture<FuncionarioComponent>;

  beforeEach(async () => {
    // Configura o ambiente de teste
    await TestBed.configureTestingModule({
      // Importa o próprio componente (assumindo que ele é standalone)
      // e os módulos necessários para o HTML (FormsModule, CommonModule)
      imports: [
        FuncionarioComponent, 
        FormsModule, 
        CommonModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    // Cria a instância do componente
    fixture = TestBed.createComponent(FuncionarioComponent);
    component = fixture.componentInstance;
    // Executa o ngOnInit e faz o binding inicial
    fixture.detectChanges(); 
  });

  // --- Testes Essenciais de Estado ---
  
  it('should create', () => {
    // Garante que o componente foi criado com sucesso
    expect(component).toBeTruthy();
  });

  it('deve inicializar com o modo de Cadastro (editandoId nulo)', () => {
    // Verifica se o estado inicial de edição é nulo
    expect(component.editandoId).toBeNull();
  });
  
  it('deve carregar a lista de usuários ao inicializar', () => {
    // Verifica se os dados mock foram carregados no ngOnInit
    expect(component.listaUsuarios.length).toBeGreaterThan(0);
  });

  // --- Testes de Funcionalidade ---
  
  it('deve iniciar a edição quando iniciarEdicao for chamado', () => {
    const usuarioMock = component.listaUsuarios[0];
    
    component.iniciarEdicao(usuarioMock);
    fixture.detectChanges();

    // Verifica se o ID de edição foi setado
    expect(component.editandoId).toBe(usuarioMock.id);
    // Verifica se o modelo do formulário foi preenchido com o nome
    expect(component.novoUsuario.nome).toBe(usuarioMock.nome);
    // Verifica se, por segurança, os campos de senha foram limpos ao iniciar a edição
    expect(component.novoUsuario.senha).toBe('');
  });
  
  it('deve cancelar a edição e resetar o formulário', () => {
    // Simula um estado de edição
    component.editandoId = 1;
    component.novoUsuario.nome = 'Teste Editado';
    
    component.cancelarEdicao();
    fixture.detectChanges();
    
    // Verifica se o estado de edição foi limpo
    expect(component.editandoId).toBeNull();
    // Verifica se o formulário foi resetado (o nome deve ser vazio ou o valor padrão)
    expect(component.novoUsuario.nome).toBe('');
  });
});