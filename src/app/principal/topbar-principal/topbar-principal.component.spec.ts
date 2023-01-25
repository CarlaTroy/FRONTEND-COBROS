import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopbarPrincipalComponent } from './topbar-principal.component';

describe('TopbarPrincipalComponent', () => {
  let component: TopbarPrincipalComponent;
  let fixture: ComponentFixture<TopbarPrincipalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopbarPrincipalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopbarPrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
