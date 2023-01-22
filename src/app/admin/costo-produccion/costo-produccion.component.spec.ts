import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CostoProduccionComponent } from './costo-produccion.component';

describe('CostoProduccionComponent', () => {
  let component: CostoProduccionComponent;
  let fixture: ComponentFixture<CostoProduccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CostoProduccionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CostoProduccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
