import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarCostoProdComponent } from './editar-costo-prod.component';

describe('EditarCostoProdComponent', () => {
  let component: EditarCostoProdComponent;
  let fixture: ComponentFixture<EditarCostoProdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarCostoProdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarCostoProdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
