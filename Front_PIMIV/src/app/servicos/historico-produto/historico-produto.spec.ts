import { TestBed } from '@angular/core/testing';

import { HistoricoProdutoService } from './historico-produto.service';

describe('HistoricoProdutoService', () => {
  let service: HistoricoProdutoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HistoricoProdutoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
