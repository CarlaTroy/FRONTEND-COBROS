import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioProduccionComponent } from './formulario-produccion.component';

describe('FormularioProduccionComponent', () => {
  let component: FormularioProduccionComponent;
  let fixture: ComponentFixture<FormularioProduccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormularioProduccionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioProduccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
