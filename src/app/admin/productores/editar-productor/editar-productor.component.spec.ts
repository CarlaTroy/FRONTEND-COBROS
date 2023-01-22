import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarProductorComponent } from './editar-productor.component';

describe('EditarProductorComponent', () => {
  let component: EditarProductorComponent;
  let fixture: ComponentFixture<EditarProductorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarProductorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarProductorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
