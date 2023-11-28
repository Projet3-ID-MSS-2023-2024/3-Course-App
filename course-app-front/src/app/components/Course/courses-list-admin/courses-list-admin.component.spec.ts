import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesListAdminComponent } from './courses-list-admin.component';

describe('CoursesListAdminComponent', () => {
  let component: CoursesListAdminComponent;
  let fixture: ComponentFixture<CoursesListAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CoursesListAdminComponent]
    });
    fixture = TestBed.createComponent(CoursesListAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
