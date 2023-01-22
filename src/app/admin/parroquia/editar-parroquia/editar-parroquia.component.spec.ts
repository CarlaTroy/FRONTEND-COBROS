import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarParroquiaComponent } from './editar-parroquia.component';

describe('EditarParroquiaComponent', () => {
  let component: EditarParroquiaComponent;
  let fixture: ComponentFixture<EditarParroquiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarParroquiaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarParroquiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
