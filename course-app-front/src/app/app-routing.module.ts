import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './components/accueil/accueil.component';
import { LoginComponent } from './components/login/login.component';
import { FirstRegisterComponent } from './components/first-register/first-register.component';
import { CourseAddComponent } from './components/Course/course-add/course-add.component';
import { InscriptionComponent } from './components/inscription/inscription/inscription.component';
import { ConfirmInscriptionComponent } from './components/inscription/confirm-inscription/confirm-inscription.component';
import { VilleAddComponent } from './components/Ville/ville-add/ville-add.component';
import { AdresseAddComponent } from './components/Adresse/adresse-add/adresse-add.component';
import { UserProfileComponent } from './components/Profile/user-profile/user-profile.component';
import { CoursesListComponent } from './components/Course/courses-list/courses-list.component';
import { GestionAdminComponent } from './components/gestion-admin/gestion-admin.component';


const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'login', component: LoginComponent},
  { path: 'accueil', component: AccueilComponent},
  { path: 'firstRegister', component: FirstRegisterComponent},
  { path: 'courses', component: CoursesListComponent},
  { path: 'course-add', component: CourseAddComponent},
  { path: 'inscription', component: InscriptionComponent},
  { path: 'confirm/inscription/:code', component: ConfirmInscriptionComponent},
  { path:'ville-add',component:VilleAddComponent},
  {path:'adresse-add',component:AdresseAddComponent},
  { path: 'user-profile',component:UserProfileComponent },
  { path: 'administration',component:GestionAdminComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
