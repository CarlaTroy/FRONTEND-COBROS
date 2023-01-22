import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarProductorComponent } from './listar-productor.component';

describe('ListarProductorComponent', () => {
  let component: ListarProductorComponent;
  let fixture: ComponentFixture<ListarProductorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarProductorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarProductorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
