import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarParroquiaComponent } from './listar-parroquia.component';

describe('ListarParroquiaComponent', () => {
  let component: ListarParroquiaComponent;
  let fixture: ComponentFixture<ListarParroquiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarParroquiaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarParroquiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
