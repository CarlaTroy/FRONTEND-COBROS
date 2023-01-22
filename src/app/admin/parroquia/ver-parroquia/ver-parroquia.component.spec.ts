import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerParroquiaComponent } from './ver-parroquia.component';

describe('VerParroquiaComponent', () => {
  let component: VerParroquiaComponent;
  let fixture: ComponentFixture<VerParroquiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerParroquiaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerParroquiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
