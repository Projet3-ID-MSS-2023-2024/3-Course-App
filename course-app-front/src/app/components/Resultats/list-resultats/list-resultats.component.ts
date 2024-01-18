import { Component, OnInit } from '@angular/core';
import { ResultatService } from 'src/app/services/resultat.service';
import { Course } from 'src/models/course';
import { Resultat } from 'src/models/resultat';

@Component({
  selector: 'app-list-resultats',
  templateUrl: './list-resultats.component.html',
  styleUrls: ['./list-resultats.component.css']
})
export class ListResultatsComponent implements OnInit {
  courses!: Course[];
  visible: boolean = false;
  loading: boolean = true;
  courseEffectuee : boolean = true;
  resultats! : Resultat[];
  identifiant!: number;


  constructor(private resultatService: ResultatService) {}

  ngOnInit(): void {
    this.resultatService.getCoursesEndedAndNotDeleted().subscribe((courses: Course[])=>{
      this.courses=courses;
      this.loading = false;
    })
  }

   showDialog() {
    this.visible = true;
   }

    getResultatsArret(id: number){
    this.resultatService.getResultatsByCourseAndAbandon(id).subscribe((resultats: Resultat[])=>{
      this.resultats = resultats;
      this.identifiant =id;
      this.courseEffectuee =false;
    })
  }
   getResultats(id: number){
    this.showDialog();
    this.resultatService.getResultatsByCourseNotAbandon(id).subscribe((resultats: Resultat[]) => {
      this.resultats = resultats;
      this.identifiant =id;
      this.courseEffectuee = true;
    })
   }

}
