import { Component, OnInit } from '@angular/core';
import { Table } from 'primeng/table';
import { AuthService } from 'src/app/services/auth.service';
import { CourseService } from 'src/app/services/course.service';
import { Course } from 'src/models/course';
import { User } from 'src/models/user';

@Component({
  selector: 'app-courses-delete-list',
  templateUrl: './courses-delete-list.component.html',
  styleUrls: ['./courses-delete-list.component.css']
})
export class CoursesDeleteListComponent implements OnInit {
  courses!: Course[];
  visible: boolean = false;
  loading: boolean = true;
  course!:Course;
  loggedUser !: User;

  constructor(private courseService: CourseService,
              private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getUserWithToken(this.authService.getLoggedInToken()).subscribe((res)=>{
      this.loggedUser = res;
      this.courseService.getCoursesByGestionnaireAndDeleted(this.loggedUser.id).subscribe((courses: Course[]) => {
        console.log(courses);
        this.courses = courses;
        this.loading = false;
      });
    })
    this.course = new Course();
  }

   clear(table: Table) {
       table.clear();
   }
}
