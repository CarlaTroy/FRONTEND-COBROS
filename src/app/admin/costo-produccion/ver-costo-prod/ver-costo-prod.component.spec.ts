import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerCostoProdComponent } from './ver-costo-prod.component';

describe('VerCostoProdComponent', () => {
  let component: VerCostoProdComponent;
  let fixture: ComponentFixture<VerCostoProdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerCostoProdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerCostoProdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
