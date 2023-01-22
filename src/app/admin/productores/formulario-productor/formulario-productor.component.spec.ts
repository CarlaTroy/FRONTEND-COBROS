import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioProductorComponent } from './formulario-productor.component';

describe('FormularioProductorComponent', () => {
  let component: FormularioProductorComponent;
  let fixture: ComponentFixture<FormularioProductorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormularioProductorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioProductorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
