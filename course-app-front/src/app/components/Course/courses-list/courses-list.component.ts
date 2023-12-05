import { Component, OnInit, ViewChild } from '@angular/core';
import { ICreateOrderRequest, IPayPalConfig, NgxPaypalComponent } from 'ngx-paypal';
import { MessageService, SelectItem } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';
import { CourseService } from 'src/app/services/course.service';
import { ResultatService } from 'src/app/services/resultat.service';
import { Course } from 'src/models/course';
import { Resultat } from 'src/models/resultat';
import { User } from 'src/models/user';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css'],
  providers: [MessageService]
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
  course!: Course;
  loggedUser!: User;
  newResultat: Resultat = new Resultat;

  courses: Course[] | undefined = [];

  // Tri
  sortOptions!: SelectItem[];
  sortOrder!: number;
  sortField!: string;
  sortKey: any;

  constructor(private courseService: CourseService, private authService: AuthService, private messageService: MessageService, private resultatService: ResultatService) {}

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
    this.courseService.getAvailableCourses().subscribe((courses: Course[] | undefined) => {
      this.courses = courses;
    });
  }

  showPaymentDial(prix: string, course: Course): void {
    this.coursePrice = prix;
    this.course = course;
    this.paymentDialVisible = true;
  }

  //config paypal
  // email: sb-pfa1222784084@personal.example.com
  // mdp: p!V.L6f*
  configPayPal(): void {
    this.loadLoggedUser();
    this.payPalConfig = {
      currency: 'EUR',
      clientId: 'AQY5t6tEDcJUBlLt9jAyxh-pTXXIKimV6HE6KGOr_lk72bOEZfpSmC4uHHF-DtDxR75wbBzr2gIL4uUI',
      createOrderOnClient: (data) => <ICreateOrderRequest>{
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: 'EUR',
              value: this.coursePrice,
              breakdown: {
                item_total: {
                  currency_code: 'EUR',
                  value: this.coursePrice
                }
              }
            },
            items: [
              {
                name: 'Course',
                quantity: '1',
                category: 'DIGITAL_GOODS',
                unit_amount: {
                  currency_code: 'EUR',
                  value: this.coursePrice,
                },
              }
            ]
          }
        ]
      },
      advanced: {
        commit: 'true'
      },
      style: {
        label: 'paypal',
        layout: 'horizontal'
      },
      onApprove: (data, actions) => {
        console.log('onApprove - transaction was approved, but not authorized', data, actions);
        actions.order.get().then((details: any) => {
          console.log('onApprove - you can get full order details inside onApprove: ', details);
        });
      },
      onClientAuthorization: (data) => {
        this.newResultat.abandon = null;
        this.newResultat.temps = null;
        this.newResultat.course = this.course;
        this.newResultat.utilisateur = this.loggedUser;

        this.resultatService.add(this.newResultat).subscribe((res) => {
          this.paymentDialVisible = false;
          this.messageService.add({ severity: 'success', summary: 'Paiement réussi !', detail: 'Votre participation est enregistrée.' });
        }, (error) => {
          this.messageService.add({ severity: 'error', summary: 'Une erreur est survenue !', detail: `${error.error}` });
        });
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
      },
      onError: err => {
        this.messageService.add({ severity: 'error', summary: 'Une erreur est survenue !', detail: `${err.error}` });
      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
      },
    };
  }

  loadLoggedUser(){
    this.authService.getUserWithToken(this.authService.getLoggedInToken()).subscribe((res)=>{
      this.loggedUser = res;
      console.log(this.loggedUser)
    })
  }
}
