import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { FuncionarioComponent } from './funcionario.component';
import { FuncionarioService } from '../../servicos/funcionario/funcionario.service';

describe('FuncionarioComponent', () => {
  let component: FuncionarioComponent;
  let fixture: ComponentFixture<FuncionarioComponent>;

  const funcionarioServiceMock = {
    obterTodos: () => of([]),
    deletar: () => of(void 0)
  } as Partial<FuncionarioService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FuncionarioComponent],
      providers: [{ provide: FuncionarioService, useValue: funcionarioServiceMock }]
    }).compileComponents();

    fixture = TestBed.createComponent(FuncionarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});