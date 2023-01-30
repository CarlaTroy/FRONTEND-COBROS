import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablePaymentStudentComponent } from './table-payment-student.component';

describe('TablePaymentStudentComponent', () => {
  let component: TablePaymentStudentComponent;
  let fixture: ComponentFixture<TablePaymentStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablePaymentStudentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TablePaymentStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
