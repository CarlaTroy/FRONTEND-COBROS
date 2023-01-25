import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEnrollementComponent } from './list-enrollement.component';

describe('ListEnrollementComponent', () => {
  let component: ListEnrollementComponent;
  let fixture: ComponentFixture<ListEnrollementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListEnrollementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListEnrollementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
