import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarCostoProdComponent } from './listar-costo-prod.component';

describe('ListarCostoProdComponent', () => {
  let component: ListarCostoProdComponent;
  let fixture: ComponentFixture<ListarCostoProdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarCostoProdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarCostoProdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
