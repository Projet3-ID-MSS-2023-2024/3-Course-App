import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesDeleteListComponent } from './courses-delete-list.component';

describe('CoursesDeleteListComponent', () => {
  let component: CoursesDeleteListComponent;
  let fixture: ComponentFixture<CoursesDeleteListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CoursesDeleteListComponent]
    });
    fixture = TestBed.createComponent(CoursesDeleteListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
