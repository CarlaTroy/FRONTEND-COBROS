import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarCantonComponent } from './listar-canton.component';

describe('ListarCantonComponent', () => {
  let component: ListarCantonComponent;
  let fixture: ComponentFixture<ListarCantonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarCantonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarCantonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
