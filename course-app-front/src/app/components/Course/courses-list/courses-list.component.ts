import { Component, OnInit, ViewChild } from '@angular/core';
import { ICreateOrderRequest, IPayPalConfig, NgxPaypalComponent } from 'ngx-paypal';
import { MessageService, SelectItem } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';
import { CourseService } from 'src/app/services/course.service';
import { ResultatService } from 'src/app/services/resultat.service';
import { Course } from 'src/models/course';
import { Resultat } from 'src/models/resultat';
import { User } from 'src/models/user';
import { MapService } from 'src/app/services/map.service';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css'],
  providers: [MessageService]
})
export class CoursesListComponent implements OnInit {
  // Variables PayPal
  @ViewChild("paypal")
  paypalComponent?: NgxPaypalComponent;
  public payPalConfig!: IPayPalConfig;
  showSuccess?: boolean;
  paypalInit: boolean = false;
  paymentDialVisible: boolean = false;
  coursePrice!: string;

  // Variables d'affichage des données
  course!: Course;
  loggedUser!: User;
  newResultat: Resultat = new Resultat;
  map : any;
  dialogMap:boolean =false;
  courseMap!: Course;
  disableBtnInscription: boolean = false;

  // Tableaux de données
  courses: Course[] | undefined = [];
  resultats: Resultat[] | undefined = [];
  payedCourses: Course[] | undefined = [];
  upcomingCourses: Course [] | undefined = [];

  // Variables de tri
  sortOptions!: SelectItem[];
  sortOrder!: number;
  sortField!: string;
  sortKey: any;

  constructor(
    private courseService: CourseService,
    public authService: AuthService,
    private messageService: MessageService,
    private resultatService: ResultatService,
    private mapService : MapService
       ) {}

  ngOnInit(): void {
    // Vérifie si un user est connecté
    if (this.authService.isUserLoggedIn()) {
      // Si oui, charger les données du user et ses courses payées
      this.loadLoggedUserAndResultats();
    } else {
      this.disableBtnInscription = true;
    }
    // Récupération des courses
    this.getCourses();

    // Setup du tri sur le prix pour les courses
    this.sortField = 'prix';
    this.sortOptions = [
      { label: 'Prix de Haut en Bas', value: 'Prix de Haut en Bas' },
      { label: 'Prix de Bas en Haut', value: 'Prix de Bas en Haut' }
  ];
  }

  // Fonction d'événement quand le tri change
  onSortChange(event: any) {
    let value = event.value;

    // Prix de haut en bas
    if (value === 'Prix de Haut en Bas') {
        this.sortOrder = -1;
    } else { // Prix de bas en haut
        this.sortOrder = 1;
    }
  }

  // Récupération de toutes les courses disponibles à venir
  getCourses(): void {
    this.courseService.getAvailableCourses().subscribe((courses: Course[] | undefined) => {
      this.courses = courses;
    });
  }

  // Récupération des résultats de l'utilisateur
  getResultats(): void {
    this.resultatService.getResultatsByUserId(this.loggedUser.id).subscribe((resultats: Resultat[] | undefined) => {
      this.resultats = resultats;
      this.payedCourses = [];
      // Pour chaque résultat (course déjà payée) séparation de toutes les courses en 2 tableaux (courses payées et à venir)
      resultats!.forEach(resultat => {
        this.courses!.forEach(course => {
          // Si la course possède déjà un résultat, alors elle est payée, ajout dans le tableau payedCourses
          if(course.id == resultat.course.id) {
            this.payedCourses!.push(course);
          }        
        });
      });
    });
  }

  // Fonction d'affichage du dialogue de paiement, sauvegarde aussi le prix de la course et la course
  showPaymentDial(prix: string, course: Course): void {
    this.coursePrice = prix;
    this.course = course;
    this.paymentDialVisible = true;
  }

  //config paypal
  // email: sb-pfa1222784084@personal.example.com
  // mdp: p!V.L6f*
  configPayPal(): void {
    this.payPalConfig = {
      currency: 'EUR',
      // Identifiant de l'application pour paypal sandbox
      clientId: 'AQY5t6tEDcJUBlLt9jAyxh-pTXXIKimV6HE6KGOr_lk72bOEZfpSmC4uHHF-DtDxR75wbBzr2gIL4uUI',
      createOrderOnClient: (data) => <ICreateOrderRequest>{
        intent: 'CAPTURE',
        // Configuration de l'achat
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
              // Objet acheté (course)
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
      // Achat approuvé mais pas authorisé
      onApprove: (data, actions) => {
        console.log('onApprove - transaction was approved, but not authorized', data, actions);
        actions.order.get().then((details: any) => {
          console.log('onApprove - you can get full order details inside onApprove: ', details);
        });
      },
      // Achat autorisé
      onClientAuthorization: (data) => {

        // Initialisation du nouveau résultat après le paiement
        this.newResultat.abandon = null;
        this.newResultat.temps = null;
        this.newResultat.course = this.course;
        this.newResultat.utilisateur = this.loggedUser;

        // Ajout du nouveau résultat
        this.resultatService.add(this.newResultat).subscribe((res) => {
          // Réfresh des résultats après l'ajout
          this.getResultats();

          // Ferme le dialogue de paiement
          this.paymentDialVisible = false;

          // Message de paiement réussi
          this.messageService.add({ severity: 'success', summary: 'Paiement réussi !', detail: 'Votre participation est enregistrée.' });
        }, (error) => {
          // Message d'erreur
          this.messageService.add({ severity: 'error', summary: 'Une erreur est survenue !', detail: `${error.error}` });
        });
      },
      // Paiement annulé
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

  // Récupération du user connecté et de ses résultats
  loadLoggedUserAndResultats(){
    this.authService.getUserWithToken(this.authService.getLoggedInToken()).subscribe((res)=>{
      this.loggedUser = res;
      if (this.loggedUser.role.includes("COUREUR")) {
        this.disableBtnInscription = false;
      } else {
        // Si le user n'est pas un coureur, impossible de participer aux courses
        this.disableBtnInscription = true;
      }
      this.getResultats();
    })
  }

  // Fonction d'affichage du dialogue de map (chemin de la course)
  showMapDialog(course : Course){
    this.courseMap = course;
    this.dialogMap = true;
    setTimeout(() => {
      this.mapService.loadMap(course.adresse.latitude,course.adresse.longitude,course.adresse1.latitude,course.adresse1.longitude);
    }, 0);
  }
}
