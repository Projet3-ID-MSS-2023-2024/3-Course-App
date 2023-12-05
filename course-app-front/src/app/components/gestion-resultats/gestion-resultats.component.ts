import { Component, OnInit } from '@angular/core';
import { Course} from 'src/models/course';
import { Router, RouterLink } from '@angular/router';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/models/user';
import { ResultatsService } from 'src/app/services/resultats.service';
import { Resultat } from 'src/models/resultat';

@Component({
  selector: 'app-gestion-resultats',
  templateUrl: './gestion-resultats.component.html',
  styleUrls: ['./gestion-resultats.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class GestionResultatsComponent implements OnInit{

  courses!: Course[];
  visible: boolean = false;
  loading: boolean = true;
  course!: Course;
  resultats! : Resultat[];
  loggedUser !: User;

  constructor(private resultatService: ResultatsService,
              private confirmationService: ConfirmationService,
              private messageService: MessageService,
              private router: Router,
              private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getUserWithToken(this.authService.getLoggedInToken()).subscribe((res)=>{
      this.loggedUser = res;
      this.resultatService.getCoursesByGestionnaireAndNotEnded(this.loggedUser.id).subscribe((courses: Course[]) => {
        this.courses = courses;
        this.loading = false;
      });
    })
  }


  //  clear(table: Table) {
  //      table.clear();
  //  }


  //  getLoggedUser(){
  //   this.authService.getUserWithToken(this.authService.getLoggedInToken()).subscribe((res)=>{
  //     this.loggedUser = res;
  //   })
  // }

  //  getCourses(){
  //   this.getLoggedUser();
  //   this.courseService.getCoursesByGestionnaireAndNotDeleted(this.loggedUser.id).subscribe((courses: Course[]) => {
  //     this.courses = courses;
  //     this.loading = false;
  //   });
  // }
}
