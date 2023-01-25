import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrupoInvestigacionComponent } from './grupo-investigacion.component';

describe('GrupoInvestigacionComponent', () => {
  let component: GrupoInvestigacionComponent;
  let fixture: ComponentFixture<GrupoInvestigacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrupoInvestigacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrupoInvestigacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
