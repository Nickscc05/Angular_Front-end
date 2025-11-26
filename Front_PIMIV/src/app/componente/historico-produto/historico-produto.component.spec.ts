import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricoProdutoComponent } from './historico-produto.component';

describe('HistoricoProdutoComponent', () => {
  let component: HistoricoProdutoComponent;
  let fixture: ComponentFixture<HistoricoProdutoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoricoProdutoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HistoricoProdutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
