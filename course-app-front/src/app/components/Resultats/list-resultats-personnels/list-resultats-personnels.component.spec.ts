import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListResultatsPersonnelsComponent } from './list-resultats-personnels.component';

describe('ListResultatsPersonnelsComponent', () => {
  let component: ListResultatsPersonnelsComponent;
  let fixture: ComponentFixture<ListResultatsPersonnelsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListResultatsPersonnelsComponent]
    });
    fixture = TestBed.createComponent(ListResultatsPersonnelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
