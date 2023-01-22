import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarResultadosComponent } from './editar-resultados.component';

describe('EditarResultadosComponent', () => {
  let component: EditarResultadosComponent;
  let fixture: ComponentFixture<EditarResultadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarResultadosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarResultadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
