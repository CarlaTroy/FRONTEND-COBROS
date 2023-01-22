import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarCantonComponent } from './editar-canton.component';

describe('EditarCantonComponent', () => {
  let component: EditarCantonComponent;
  let fixture: ComponentFixture<EditarCantonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarCantonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarCantonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
