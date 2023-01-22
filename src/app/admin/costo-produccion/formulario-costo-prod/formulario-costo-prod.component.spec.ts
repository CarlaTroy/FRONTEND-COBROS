import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioCostoProdComponent } from './formulario-costo-prod.component';

describe('FormularioCostoProdComponent', () => {
  let component: FormularioCostoProdComponent;
  let fixture: ComponentFixture<FormularioCostoProdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormularioCostoProdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioCostoProdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
