import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifResultatsComponent } from './modif-resultats.component';

describe('ModifResultatsComponent', () => {
  let component: ModifResultatsComponent;
  let fixture: ComponentFixture<ModifResultatsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModifResultatsComponent]
    });
    fixture = TestBed.createComponent(ModifResultatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
