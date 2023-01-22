import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioParroquiaComponent } from './formulario-parroquia.component';

describe('FormularioParroquiaComponent', () => {
  let component: FormularioParroquiaComponent;
  let fixture: ComponentFixture<FormularioParroquiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormularioParroquiaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioParroquiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
