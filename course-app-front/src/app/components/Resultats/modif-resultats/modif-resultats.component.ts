import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { AuthService } from 'src/app/services/auth.service';
import { ResultatService } from 'src/app/services/resultat.service';
import { Course } from 'src/models/course';
import { Resultat } from 'src/models/resultat';
import { User } from 'src/models/user';

@Component({
  selector: 'app-modif-resultats',
  templateUrl: './modif-resultats.component.html',
  styleUrls: ['./modif-resultats.component.css']
})
export class ModifResultatsComponent implements OnInit{

  courses!: Course[];
  visible: boolean = false;
  loading: boolean = true;
  resultats! : Resultat[];
  loggedUser !: User;


  constructor(private resultatService: ResultatService,
              private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getUserWithToken(this.authService.getLoggedInToken()).subscribe((res)=>{
      this.loggedUser = res;
      this.resultatService.getCoursesByGestionnaireAndEnded(this.loggedUser.id).subscribe((courses: Course[]) => {
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
   }

   getResultats(id: number){
    this.showDialog();
    this.resultatService.getResultatsByCourse(id).subscribe((resultats: Resultat[]) => {
      this.resultats = resultats;
      console.log(this.resultats);
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
}
