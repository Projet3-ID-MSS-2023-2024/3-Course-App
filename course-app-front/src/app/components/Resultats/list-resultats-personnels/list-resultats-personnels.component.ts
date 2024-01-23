import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ResultatService } from 'src/app/services/resultat.service';
import { Course } from 'src/models/course';
import { Resultat } from 'src/models/resultat';
import { User } from 'src/models/user';

@Component({
  selector: 'app-list-resultats-personnels',
  templateUrl: './list-resultats-personnels.component.html',
  styleUrls: ['./list-resultats-personnels.component.css']
})
export class ListResultatsPersonnelsComponent implements OnInit{
  courses!: Course[];
  visible: boolean = false;
  loading: boolean = true;
  courseEffectuee : boolean = true;
  loggedUser !: User;
  resultats! : Resultat[];
  resultatsCourse! : Resultat[];
  identifiant!: number;

  constructor(private resultatService: ResultatService, private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getUserWithToken(this.authService.getLoggedInToken()).subscribe((res)=>{
      this.loggedUser = res;
      this.resultatService.getResultsByUserId(this.loggedUser.id).subscribe((resultat: Resultat[])=>{
        this.resultats=resultat;
        this.loading = false;
      });
    })
  }

   showDialog() {
    this.visible = true;
   }

   getResultatsArret(id: number){
    this.resultatService.getResultatsByCourseAndAbandon(id).subscribe((resultats: Resultat[])=>{
      this.resultatsCourse = resultats;
      this.identifiant =id;
      this.courseEffectuee =false;
    })
  }
   getResultats(id: number){
    this.showDialog();
    this.resultatService.getResultatsByCourseNotAbandon(id).subscribe((resultats: Resultat[]) => {
      this.resultatsCourse = resultats;
      this.identifiant =id;
      this.courseEffectuee = true;
    })
   }
}


