import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MotivoMovimentacaoComponent } from './motivo-movimentacao.component';

describe('MotivoMovimentacaoComponent', () => {
  let component: MotivoMovimentacaoComponent;
  let fixture: ComponentFixture<MotivoMovimentacaoComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MotivoMovimentacaoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MotivoMovimentacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
