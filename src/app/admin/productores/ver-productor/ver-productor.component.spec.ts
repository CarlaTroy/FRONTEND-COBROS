import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerProductorComponent } from './ver-productor.component';

describe('VerProductorComponent', () => {
  let component: VerProductorComponent;
  let fixture: ComponentFixture<VerProductorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerProductorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerProductorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
