import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarProduccionComponent } from './listar-produccion.component';

describe('ListarProduccionComponent', () => {
  let component: ListarProduccionComponent;
  let fixture: ComponentFixture<ListarProduccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarProduccionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarProduccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
