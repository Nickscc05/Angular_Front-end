import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnidadeMedida } from './unidade-medida';

describe('UnidadeMedida', () => {
  let component: UnidadeMedida;
  let fixture: ComponentFixture<UnidadeMedida>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnidadeMedida]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnidadeMedida);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
