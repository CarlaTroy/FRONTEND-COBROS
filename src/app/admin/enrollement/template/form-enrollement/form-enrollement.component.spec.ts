import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEnrollementComponent } from './form-enrollement.component';

describe('FormEnrollementComponent', () => {
  let component: FormEnrollementComponent;
  let fixture: ComponentFixture<FormEnrollementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormEnrollementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormEnrollementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
