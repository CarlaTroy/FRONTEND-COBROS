import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearProduccionComponent } from './crear-produccion.component';

describe('CrearProduccionComponent', () => {
  let component: CrearProduccionComponent;
  let fixture: ComponentFixture<CrearProduccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearProduccionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearProduccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
