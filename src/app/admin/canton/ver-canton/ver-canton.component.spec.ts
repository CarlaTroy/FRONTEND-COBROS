import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerCantonComponent } from './ver-canton.component';

describe('VerCantonComponent', () => {
  let component: VerCantonComponent;
  let fixture: ComponentFixture<VerCantonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerCantonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerCantonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
