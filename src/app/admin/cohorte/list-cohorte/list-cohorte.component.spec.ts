import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCohorteComponent } from './list-cohorte.component';

describe('ListCohorteComponent', () => {
  let component: ListCohorteComponent;
  let fixture: ComponentFixture<ListCohorteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCohorteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListCohorteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
