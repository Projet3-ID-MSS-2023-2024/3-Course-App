import { Component, OnInit } from '@angular/core';
import { MessageService, SelectItem } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';
import { CourseService } from 'src/app/services/course.service';
import { ResultatService } from 'src/app/services/resultat.service';
import { Course } from 'src/models/course';
import { Resultat } from 'src/models/resultat';
import { User } from 'src/models/user';
import { MapService } from 'src/app/services/map.service';

@Component({
  selector: 'app-my-courses',
  templateUrl: './my-courses.component.html',
  styleUrls: ['./my-courses.component.css'],
})
export class MyCoursesComponent  implements OnInit {
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

  // Variables de tri
  sortOptions!: SelectItem[];
  sortOrder!: number;
  sortField!: string;
  sortKey: any;

  constructor(
    private courseService: CourseService,
    public authService: AuthService,
    private resultatService: ResultatService,
    private mapService : MapService
       ) {}

  ngOnInit(): void {
    // Vérifie si un user est connecté
    if (this.authService.isUserLoggedIn()) {
      // Si oui, charger les données du user et ses courses payées
      this.loadLoggedUserAndCourses();
    } else {
      this.disableBtnInscription = true;
    }

    // Setup du tri sur le prix pour les courses
    this.sortField = 'prix';
    this.sortOrder = 1;
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
  getCourses(id: number): void {
    this.courseService.getPayedCoursesByUser(id).subscribe((courses: Course[] | undefined) => {
      this.courses = courses;
    });
  }

  // Récupération du user connecté et de ses résultats
  loadLoggedUserAndCourses(){
    this.authService.getUserWithToken(this.authService.getLoggedInToken()).subscribe((res)=>{
      this.loggedUser = res;
      if (this.loggedUser.role.includes("COUREUR")) {
        this.disableBtnInscription = false;
      } else {
        // Si le user n'est pas un coureur, impossible de participer aux courses
        this.disableBtnInscription = true;
      }
      this.getCourses(this.loggedUser.id);
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

