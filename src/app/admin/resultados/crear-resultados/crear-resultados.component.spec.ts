import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearResultadosComponent } from './crear-resultados.component';

describe('CrearResultadosComponent', () => {
  let component: CrearResultadosComponent;
  let fixture: ComponentFixture<CrearResultadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearResultadosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearResultadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
