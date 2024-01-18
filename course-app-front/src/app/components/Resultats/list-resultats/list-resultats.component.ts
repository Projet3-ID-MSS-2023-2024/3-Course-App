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

  resultats! : Resultat[];


  constructor(private resultatService: ResultatService) {}

  ngOnInit(): void {
    this.resultatService.getCoursesEndedAndNotDeleted().subscribe((courses: Course[])=>{
      this.courses=courses;
      console.log(this.courses);
      this.loading = false;
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
