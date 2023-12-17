import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListResultatsComponent } from './list-resultats.component';

describe('ListResultatsComponent', () => {
  let component: ListResultatsComponent;
  let fixture: ComponentFixture<ListResultatsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListResultatsComponent]
    });
    fixture = TestBed.createComponent(ListResultatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
