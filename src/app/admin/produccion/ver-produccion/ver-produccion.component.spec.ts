import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerProduccionComponent } from './ver-produccion.component';

describe('VerProduccionComponent', () => {
  let component: VerProduccionComponent;
  let fixture: ComponentFixture<VerProduccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerProduccionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerProduccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
