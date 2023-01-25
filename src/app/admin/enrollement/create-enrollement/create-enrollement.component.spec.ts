import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEnrollementComponent } from './create-enrollement.component';

describe('CreateEnrollementComponent', () => {
  let component: CreateEnrollementComponent;
  let fixture: ComponentFixture<CreateEnrollementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEnrollementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEnrollementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
