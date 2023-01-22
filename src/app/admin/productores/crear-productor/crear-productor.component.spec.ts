import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearProductorComponent } from './crear-productor.component';

describe('CrearProductorComponent', () => {
  let component: CrearProductorComponent;
  let fixture: ComponentFixture<CrearProductorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearProductorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearProductorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
