import { Component, OnInit, ViewChild } from '@angular/core';
import { IPayPalConfig, NgxPaypalComponent } from 'ngx-paypal';
import { SelectItem } from 'primeng/api';
import { CourseService } from 'src/app/services/course.service';
import { PaypalService } from 'src/app/services/paypal.service';
import { Course } from 'src/models/course';

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
  paypalInit: boolean = false;
  paymentDialVisible: boolean = false;
  coursePrice!: string;

  courses: Course[] | undefined = [];

  // Tri
  sortOptions!: SelectItem[];
  sortOrder!: number;
  sortField!: string;
  sortKey: any;

  constructor(private payPalService: PaypalService, private courseService: CourseService) {}

  ngOnInit(): void {
    this.getCourses();

    this.sortField = 'prix';
    this.sortOptions = [
      { label: 'Prix de Haut en Bas', value: 'Prix de Haut en Bas' },
      { label: 'Prix de Bas en Haut', value: 'Prix de Bas en Haut' }
  ];
  }

  onSortChange(event: any) {
    let value = event.value;

    if (value === 'Prix de Haut en Bas') {
        this.sortOrder = -1;
    } else {
        this.sortOrder = 1;
    }
}

  getCourses(): void {
    this.courseService.getCourses().subscribe((courses: Course[] | undefined) => {
      this.courses = courses;
    });
  }

  showPaymentDial(price: string): void {
    this.coursePrice = price;
    this.paymentDialVisible = true;
  }

  configPayPal(): void {
    this.payPalConfig = this.payPalService.initConfig(this.coursePrice);
  }
}
