import { TestBed } from '@angular/core/testing';

import { MotivoMovimentacaoService } from './motivo-movimentacao.service';

describe('MotivoMovimentacaoService', () => {
  let service: MotivoMovimentacaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MotivoMovimentacaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
