import { Component, OnInit } from '@angular/core';
import { Course} from 'src/models/course';
import { Router, RouterLink } from '@angular/router';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/models/user';
import { ResultatService } from 'src/app/services/resultat.service';
import { Resultat } from 'src/models/resultat';
import { Table } from 'primeng/table';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-gestion-resultats',
  templateUrl: './gestion-resultats.component.html',
  styleUrls: ['./gestion-resultats.component.css'],
  providers: [ConfirmationService]
})
export class GestionResultatsComponent implements OnInit{

  courses!: Course[];
  visible: boolean = false;
  loading: boolean = true;
  resultats! : Resultat[];
  resultat! : Resultat;
  loggedUser !: User;
  addResultForm!: FormGroup;
  addAbandonForm!: FormGroup;
  isLoading:boolean =false;
  id!: number;

  constructor(private resultatService: ResultatService,
              private messageService: MessageService,
              private router: Router,
              private authService: AuthService,
              private fb : FormBuilder,) {}

  ngOnInit(): void {
    this.addResultForm = this.fb.group({
      temps: ['', Validators.required],
      })
    this.addAbandonForm =this.fb.group({
        abandon: ['', Validators.required],
      })
    this.authService.getUserWithToken(this.authService.getLoggedInToken()).subscribe((res)=>{
      this.loggedUser = res;
      this.resultatService.getCoursesByGestionnaireAndNotEnded(this.loggedUser.id).subscribe((courses: Course[]) => {
        this.courses = courses;
        this.loading = false;
      });
    })
  }


   clear(table: Table) {
       table.clear();
   }

   showDialog() {
    this.visible = true;
    this.addResultForm = this.fb.group({
      temps: ['', Validators.required],
      })
    this.addAbandonForm =this.fb.group({
        abandon: ['', Validators.required],
      })
   }
   closeDialog() {
    this.visible = false;
   }

   getResultats(id: number){
    this.showDialog();
    this.id=id;
    this.resultatService.getResultatsByCourse(this.id).subscribe((resultats: Resultat[]) => {
      this.resultats = resultats;
    })
   }
   getLoggedUser(){
    this.authService.getUserWithToken(this.authService.getLoggedInToken()).subscribe((res)=>{
      this.loggedUser = res;
    })
  }

   getCourses(){
    this.getLoggedUser();
    this.resultatService.getCoursesByGestionnaireAndNotEnded(this.loggedUser.id).subscribe((courses: Course[]) => {
      this.courses = courses;
      this.loading = false;
    });
  }
  ajouter(){
    this.isLoading=true;
    for (let index = 0; index < this.resultats.length; index++) {
      console.log(this.addResultForm.value.temps)
      if( this.addResultForm.value.temps[index] == null && this.addAbandonForm.value.abandon[index] == null){
        this.messageService.add({ severity: 'error', summary: 'Une erreur est survenue !', detail: 'Vous devez remplir le champ abandon ou le champ temps pour chaque participant' });
        this.isLoading=false;
      }else if(this.addResultForm.value.temps[index] != null && this.addAbandonForm.value.abandon[index] != null){
        this.messageService.add({ severity: 'error', summary: 'Une erreur est survenue !', detail: 'Vous ne devez remplir que le champ abandon ou le champ temps pour chaque participant' });
        this.isLoading=false;
      }else if(this.addResultForm.value.temps[index] != null){
        this.resultat.temps=this.addResultForm.value.temps[index];
        this.resultat.id=this.resultats[index].id;
        console.log(this.resultat);
        //this.resultatService.addResultats(this.resultat).subscribe(()=>{
        //   this.isLoading=false;
        //    },(error: { error: any; })=>{
        //      this.isLoading=false;
        //      this.messageService.add({ severity: 'error', summary: 'Une erreur est survenue !', detail: `${error.error}` });

        // })
        this.isLoading=false;
        this.closeDialog();
        this.router.navigateByUrl('/resultats/admin');
      // }else if(this.addAbandonForm.value.abandon[index] != null){
      //   this.isLoading=false;
      //   this.closeDialog();
      //   this.router.navigateByUrl('/resultats/admin');
      }

    }
  }
}
