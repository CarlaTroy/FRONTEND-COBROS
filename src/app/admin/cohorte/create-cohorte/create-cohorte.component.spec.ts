import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCohorteComponent } from './create-cohorte.component';

describe('CreateCohorteComponent', () => {
  let component: CreateCohorteComponent;
  let fixture: ComponentFixture<CreateCohorteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateCohorteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateCohorteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
