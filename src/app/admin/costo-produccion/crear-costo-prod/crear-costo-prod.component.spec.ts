import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearCostoProdComponent } from './crear-costo-prod.component';

describe('CrearCostoProdComponent', () => {
  let component: CrearCostoProdComponent;
  let fixture: ComponentFixture<CrearCostoProdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearCostoProdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearCostoProdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
