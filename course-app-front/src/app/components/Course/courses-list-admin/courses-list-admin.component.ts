import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';
import { Course} from 'src/models/course';
import { Table } from 'primeng/table';
import { Router, RouterLink } from '@angular/router';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/models/user';
import { AdresseService } from 'src/app/services/adresse.service';
import { MapService } from 'src/app/services/map.service';
import { Adresse } from 'src/models/adresse';

@Component({
  selector: 'app-courses-list-admin',
  templateUrl: './courses-list-admin.component.html',
  styleUrls: ['./courses-list-admin.component.css'],
  providers: [ConfirmationService]
})
export class CoursesListAdminComponent implements OnInit{
  courses!: Course[];
  visible: boolean = false;
  suggestions!: any[];
  modifCourseForm!:FormGroup;
  loading: boolean = true;
  course!:Course;
  loggedUser !: User;
  dialogMap:boolean =false;
  isLoading:boolean =false;

  constructor(private courseService: CourseService,
              private confirmationService: ConfirmationService,
              private mapService: MapService,
              private messageService: MessageService,
              private adresseService : AdresseService,
              private fb: FormBuilder,
              private router: Router,
              private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getUserWithToken(this.authService.getLoggedInToken()).subscribe((res)=>{
      this.loggedUser = res;
      this.courseService.getCoursesByGestionnaireAndNotDeleted(this.loggedUser.id).subscribe((courses: Course[]) => {
        this.courses = courses;
        this.loading = false;
      });
    })
    this.course = new Course();
    this.modifCourseForm = this.fb.group({
      titre: ['', Validators.required],
      prix: ['', Validators.required],
      date: ['', Validators.required],
      heure: ['', Validators.required],
      adresseDep: ['', Validators.required],
      adresseArr: ['', Validators.required]
    })
  }

  search(query : string) {
    this.adresseService.getAdressesBelges(query).subscribe(
      (res) => {
        this.suggestions = res.map((item: any) => item.display_name);
      })
  }

  displayMap(){
    this.adresseService.getLatLong(this.modifCourseForm.value.adresseDep).subscribe((res)=>{
      const lati = res.map((item: any) => item.lat);
      const long = res.map((item:any)=> item.lon);
      if(long[0] != undefined){
        this.adresseService.getLatLong(this.modifCourseForm.value.adresseArr).subscribe((res)=>{
          const lat1 = res.map((item: any) => item.lat);
          const long1 = res.map((item:any)=> item.lon);
          if(lat1[0] != undefined){
            this.dialogMap = true;
            setTimeout(() => {
              this.mapService.loadMap(lati[0], long[0], lat1[0], long1[0]);  /* Chargement de la carte */
            }, 0);
          } else {
            this.messageService.add({ severity: 'error', summary: 'Une erreur est survenue !',
            detail: "L'adresse d'arrivée ne peut pas etre nulle." });
          }
        })
      } else {
        this.messageService.add({ severity: 'error', summary: 'Une erreur est survenue !',
        detail: "L'adresse de départ ne peut pas etre nulle." });
      }
    })
  }

   clear(table: Table) {
       table.clear();
   }


   getLoggedUser(){
    this.authService.getUserWithToken(this.authService.getLoggedInToken()).subscribe((res)=>{
      this.loggedUser = res;
    })
  }

   getCourses(){
    this.getLoggedUser();
    console.log(this.loggedUser);
    this.courseService.getCoursesByGestionnaireAndNotDeleted(this.loggedUser.id).subscribe((courses: Course[]) => {
      this.courses = courses;
      console.log(this.loggedUser);
      this.loading = false;
    });
  }
   /*** Suppression d'une course***/
   deleteCourse(course: Course): void {
    this.confirmationService.confirm({
      accept: () => {
          this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Vous avez accepté' });
          this.courseService.deleteCourse(course.id)
            .subscribe({
              next: (res) => {
                this.getCourses();
              },
              error: (e) => console.error(e)
            });
      },
      reject: (type: ConfirmEventType) => {
          switch (type) {
              case ConfirmEventType.REJECT:
                  this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'Vous avez refusé' });
                  break;
              case ConfirmEventType.CANCEL:
                  this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: 'Vous avez annulé' });
                  break;
          }
      }
  });
  }

    showDialog(id: number) {
      this.courseService.getCourseById(id).subscribe((course: Course)=>{
        this.course = course;
        this.visible = true;
      })
    }

    hideDialog() {
      this.visible = false;
    }

  modifCourse(): void{
    this.isLoading=true;
    this.adresseService.getLatLong(this.modifCourseForm.value.adresseDep).subscribe((res)=>{
      const lat = res.map((item: any) => item.lat);
      const long = res.map((item:any)=> item.lon);
      this.adresseService.getAddressFromCoordinates(lat,long).then((adresse : Adresse)=>{
        this.course.adresse = adresse;
        this.adresseService.getLatLong(this.modifCourseForm.value.adresseArr).subscribe((res)=>{
          const lat1 = res.map((item: any) => item.lat);
          const long1 = res.map((item:any)=> item.lon);
          this.adresseService.getAddressFromCoordinates(lat1,long1).then((adresse1 : Adresse)=>{
            this.course.adresse1 = adresse1;
            if(this.modifCourseForm.value.titre != ''){
              this.course.titre = this.modifCourseForm.value.titre;
            }

            if(this.modifCourseForm.value.prix != ''){
              this.course.prix = this.modifCourseForm.value.prix;
            }

            if(this.modifCourseForm.value.date != ''){
              this.course.date = this.modifCourseForm.value.date;
            }

            if(this.modifCourseForm.value.heure != ''){
              this.course.heure = this.modifCourseForm.value.heure;
            }
            this.courseService.modifCourse(this.course).subscribe((res)=>{
              this.isLoading=false;
              this.hideDialog();
              this.getCourses();
            },(error)=>{
              this.isLoading=false;
              this.messageService.add({ severity: 'error', summary: 'Une erreur est survenue !', detail: `${error.error}` });
            })
          }).catch((error)=>{
            this.isLoading=false;
            this.messageService.add({ severity: 'error', summary: 'Une erreur est survenue !', detail: 'L\'adresse d\'arrivé est incorrect.' });
          })
        })
      }).catch((error)=>{
        this.isLoading=false;
        this.messageService.add({ severity: 'error', summary: 'Une erreur est survenue !', detail: 'L\'adresse de départ est incorrect.' });
      })
    })
  }
}

