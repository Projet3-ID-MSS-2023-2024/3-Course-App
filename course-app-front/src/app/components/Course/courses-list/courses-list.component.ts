import { Component, OnInit, ViewChild } from '@angular/core';
import { IPayPalConfig, NgxPaypalComponent } from 'ngx-paypal';
import { PaypalService } from 'src/app/services/paypal.service';

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

  constructor(private payPalService: PaypalService) {}

  ngOnInit(): void {
    this.payPalConfig = this.payPalService.initConfig('10');
  }
}
