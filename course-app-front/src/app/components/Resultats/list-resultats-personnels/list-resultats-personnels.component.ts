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
  loggedUser !: User;
  resultats! : Resultat[];


  constructor(private resultatService: ResultatService, private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getUserWithToken(this.authService.getLoggedInToken()).subscribe((res)=>{
      this.loggedUser = res;
      this.resultatService.getResultsByUserId(this.loggedUser.id).subscribe((resultat: Resultat[])=>{
        this.resultats=resultat;
        console.log(this.resultats);
        this.loading = false;
      });
    })
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

}


