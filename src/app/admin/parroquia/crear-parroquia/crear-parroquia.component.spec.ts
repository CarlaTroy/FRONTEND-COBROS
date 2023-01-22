import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearParroquiaComponent } from './crear-parroquia.component';

describe('CrearParroquiaComponent', () => {
  let component: CrearParroquiaComponent;
  let fixture: ComponentFixture<CrearParroquiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearParroquiaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearParroquiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
