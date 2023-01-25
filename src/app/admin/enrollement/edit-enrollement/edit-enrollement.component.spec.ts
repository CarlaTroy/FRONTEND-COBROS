import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEnrollementComponent } from './edit-enrollement.component';

describe('EditEnrollementComponent', () => {
  let component: EditEnrollementComponent;
  let fixture: ComponentFixture<EditEnrollementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditEnrollementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditEnrollementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
