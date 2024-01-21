import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { AdresseService } from 'src/app/services/adresse.service';
import { Adresse } from 'src/models/adresse';
import { Course } from 'src/models/course';
import { Ville } from 'src/models/ville';
import { CourseService } from 'src/app/services/course.service';
import { Router } from '@angular/router';
import { MapService } from 'src/app/services/map.service';

@Component({
  selector: 'app-update-course-add',
  templateUrl: './update-course-add.component.html',
  styleUrls: ['./update-course-add.component.css'],
})
export class UpdateCourseAddComponent implements OnInit{
  items: any[] | undefined;
  suggestions!: any[];
  addCourseForm!: FormGroup;
  course!:Course;
  dialogMap:boolean =false;
  isLoading:boolean =false;

  constructor(
    private router: Router,
    private adresseService : AdresseService,
    private fb : FormBuilder,
    private courseService: CourseService,
    private mapService: MapService,
    private messageService : MessageService){}

  ngOnInit(): void {
    this.course = new Course();
    this.addCourseForm = this.fb.group({
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
    this.adresseService.getLatLong(this.addCourseForm.value.adresseDep).subscribe((res)=>{
      const lati = res.map((item: any) => item.lat);
      const long = res.map((item:any)=> item.lon);
      if(long[0] != undefined){
        this.adresseService.getLatLong(this.addCourseForm.value.adresseArr).subscribe((res)=>{
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

  ajouter(){
    this.isLoading=true;
    this.adresseService.getLatLong(this.addCourseForm.value.adresseDep).subscribe((res)=>{
      const lat = res.map((item: any) => item.lat);
      const long = res.map((item:any)=> item.lon);

      this.adresseService.getAddressFromCoordinates(lat,long).then((adresse : Adresse)=>{
        this.course.adresse = adresse;
        this.adresseService.getLatLong(this.addCourseForm.value.adresseArr).subscribe((res)=>{
          const lat1 = res.map((item: any) => item.lat);
          const long1 = res.map((item:any)=> item.lon);

          this.adresseService.getAddressFromCoordinates(lat1,long1).then((adresse1 : Adresse)=>{
            this.course.adresse1 = adresse1;
            this.course.titre = this.addCourseForm.value.titre;
            this.course.prix = this.addCourseForm.value.prix;
            this.course.date = this.addCourseForm.value.date;
            this.course.heure = this.addCourseForm.value.heure;

            this.courseService.addCourse(this.course).subscribe((res)=>{
              this.isLoading=false;
              console.log(res)
              this.addCourseForm.reset();
              this.router.navigateByUrl('/courses/admin');
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
