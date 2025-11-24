
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FuncionarioService } from './funcionario.service';
import { Funcionario } from '../modelos/DTO/Funcionario.model'; 

// Endereço base da API (deve ser o mesmo definido no serviço)
const API_URL = 'http://localhost:5000/api/Funcionario'; 

// Dados mock para simular a resposta da API
const TEST_DATA: Funcionario[] = [
  { id: 1, nome: 'Alexandre', cpf: '111', rg: '123', telefone: '', telefoneExtra: null, email: 'a@a.com', contaBancaria: '1', agenciaBancaria: '1', ativo: true, cargo: 'Gerente' },
  { id: 2, nome: 'Bruna', cpf: '222', rg: '456', telefone: '', telefoneExtra: null, email: 'b@b.com', contaBancaria: '2', agenciaBancaria: '2', ativo: true, cargo: 'Vendedor' }
];

describe('FuncionarioService', () => {
  let service: FuncionarioService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    // 1. Configura o módulo de teste
    TestBed.configureTestingModule({
      // OBRIGATÓRIO: Importar o módulo de teste HTTP
      imports: [HttpClientTestingModule],
      providers: [FuncionarioService]
    });

    // 2. Obtém as instâncias do serviço e do controlador de teste
    service = TestBed.inject(FuncionarioService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // 3. Verifica se não há requisições pendentes após cada teste
    httpTestingController.verify();
  });

  it('deve ser criado (instanciado)', () => {
    expect(service).toBeTruthy();
  });

  // --- Teste para o método LISTAR (GET) ---
  it('deve chamar o GET e retornar a lista de funcionários', () => {
    service.listar().subscribe(funcionarios => {
      // 4. Verifica se a resposta corresponde aos dados mock
      expect(funcionarios).toEqual(TEST_DATA);
      expect(funcionarios.length).toBe(2);
    });

    // 5. O serviço espera uma requisição GET para a URL da API
    const req = httpTestingController.expectOne(API_URL);
    expect(req.request.method).toEqual('GET');

    // 6. Responde à requisição com os dados mock
    req.flush(TEST_DATA); 
  });

  // --- Teste para o método CADASTRAR (POST) ---
  it('deve chamar o POST para cadastrar um novo funcionário', () => {
    const novoFuncionario = TEST_DATA[0];

    service.cadastrar(novoFuncionario).subscribe(response => {
      expect(response).toEqual(novoFuncionario);
    });

    // O serviço espera uma requisição POST
    const req = httpTestingController.expectOne(API_URL);
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(novoFuncionario);

    req.flush(novoFuncionario); 
  });
  
  // --- Teste para o método EXCLUIR (DELETE) ---
  it('deve chamar o DELETE para excluir um funcionário pelo ID', () => {
    const funcionarioId = 99; 
    
    service.excluir(funcionarioId).subscribe(response => {
      // Espera uma resposta vazia ou de sucesso (200 OK)
      expect(response).toEqual({}); 
    });

    // O serviço espera uma requisição DELETE com o ID na URL
    const req = httpTestingController.expectOne(`${API_URL}/${funcionarioId}`);
    expect(req.request.method).toEqual('DELETE');

    req.flush({}); 
  });
});