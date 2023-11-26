import { Component, OnInit, ViewChild } from '@angular/core';
import { IPayPalConfig, NgxPaypalComponent } from 'ngx-paypal';
import { CourseService } from 'src/app/services/course.service';
import { PaypalService } from 'src/app/services/paypal.service';
import { CourseList } from 'src/models/course';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent implements OnInit {
  @ViewChild("paypal")
  paypalComponent?: NgxPaypalComponent

  public payPalConfig!: IPayPalConfig;
  showSuccess?: boolean;
  paypalInit:boolean = false;

  courses: CourseList[] | undefined = [];

  constructor(private payPalService: PaypalService, private courseService: CourseService) {}

  ngOnInit(): void {
    this.payPalConfig = this.payPalService.initConfig('10');
    this.getCourses();
  }

  getCourses(): void {
    this.courseService.getCourses().subscribe((courses: CourseList[] | undefined) => {
      this.courses = courses;
    });
  }
}
