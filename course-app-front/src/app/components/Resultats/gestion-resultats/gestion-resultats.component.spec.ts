import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionResultatsComponent } from './gestion-resultats.component';

describe('GestionResultatsComponent', () => {
  let component: GestionResultatsComponent;
  let fixture: ComponentFixture<GestionResultatsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionResultatsComponent]
    });
    fixture = TestBed.createComponent(GestionResultatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
