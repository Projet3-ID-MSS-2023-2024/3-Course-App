import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCourseAddComponent } from './update-course-add.component';

describe('UpdateCourseAddComponent', () => {
  let component: UpdateCourseAddComponent;
  let fixture: ComponentFixture<UpdateCourseAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateCourseAddComponent]
    });
    fixture = TestBed.createComponent(UpdateCourseAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
