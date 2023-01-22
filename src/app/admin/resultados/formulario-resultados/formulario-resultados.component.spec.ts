import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioResultadosComponent } from './formulario-resultados.component';

describe('FormularioResultadosComponent', () => {
  let component: FormularioResultadosComponent;
  let fixture: ComponentFixture<FormularioResultadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormularioResultadosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioResultadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
