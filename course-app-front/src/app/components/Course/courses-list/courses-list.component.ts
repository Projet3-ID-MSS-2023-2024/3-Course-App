import { Component, OnInit, ViewChild } from '@angular/core';
import { IPayPalConfig, NgxPaypalComponent } from 'ngx-paypal';
import { SelectItem } from 'primeng/api';
import { CourseService } from 'src/app/services/course.service';
import { PaypalService } from 'src/app/services/paypal.service';
import { CourseList } from 'src/models/course';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent implements OnInit {
  // PayPal
  @ViewChild("paypal")
  paypalComponent?: NgxPaypalComponent
  public payPalConfig!: IPayPalConfig;
  showSuccess?: boolean;
  paypalInit:boolean = false;

  courses: CourseList[] | undefined = [];

  // Tri
  sortOptions!: SelectItem[];

  sortOrder!: number;

  sortField!: string;

  constructor(private payPalService: PaypalService, private courseService: CourseService) {}

  ngOnInit(): void {
    this.payPalConfig = this.payPalService.initConfig('10');
    this.getCourses();

    this.sortOptions = [
      { label: 'Price High to Low', value: '!prix' },
      { label: 'Price Low to High', value: 'prix' }
    ];
  }

  onSortChange(event: any) {
    let value = event.value;

    if (value.indexOf('!') === 0) {
        this.sortOrder = -1;
        this.sortField = value.substring(1, value.length);
    } else {
        this.sortOrder = 1;
        this.sortField = value;
    }
  }

  getCourses(): void {
    this.courseService.getCourses().subscribe((courses: CourseList[] | undefined) => {
      this.courses = courses;
    });
  }
}
