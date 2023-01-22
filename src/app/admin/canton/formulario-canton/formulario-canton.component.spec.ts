import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioCantonComponent } from './formulario-canton.component';

describe('FormularioCantonComponent', () => {
  let component: FormularioCantonComponent;
  let fixture: ComponentFixture<FormularioCantonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormularioCantonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioCantonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
