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
import { CoursesListAdminComponent } from './components/Course/courses-list-admin/courses-list-admin.component';
import { GestionAdminComponent } from './components/gestion-admin/gestion-admin.component';
import { NouveauMdpComponent } from './components/nouveau-mdp/nouveau-mdp.component';
import { UpdateUserComponent } from './components/Profile/update-user/update-user.component';
import { GestionResultatsComponent } from './components/gestion-resultats/gestion-resultats.component';
import { mdpTempGuard } from './guards/mdp-temp.guard';


const routes: Routes = [
  { path: '', component: LoginComponent, canActivate: [mdpTempGuard]},
  { path: 'login', component: LoginComponent, canActivate: [mdpTempGuard]},
  { path: 'accueil', component: AccueilComponent, canActivate: [mdpTempGuard]},
  { path: 'firstRegister', component: FirstRegisterComponent, canActivate: [mdpTempGuard]},
  { path: 'courses', component: CoursesListComponent, canActivate: [mdpTempGuard]},
  { path: 'courses/admin', component: CoursesListAdminComponent, canActivate: [mdpTempGuard]},
  { path: 'resultats/admin', component: GestionResultatsComponent, canActivate: [mdpTempGuard]},
  { path: 'course-add', component: CourseAddComponent, canActivate: [mdpTempGuard]},
  { path: 'inscription', component: InscriptionComponent, canActivate: [mdpTempGuard]},
  { path: 'confirm/inscription/:code', component: ConfirmInscriptionComponent, canActivate: [mdpTempGuard]},
  { path:'ville-add',component:VilleAddComponent, canActivate: [mdpTempGuard]},
  {path:'adresse-add',component:AdresseAddComponent, canActivate: [mdpTempGuard]},
  { path: 'user-profile',component:UserProfileComponent, canActivate: [mdpTempGuard]},
  { path: 'administration',component:GestionAdminComponent, canActivate: [mdpTempGuard]},
  { path: 'creer/mdp',component:NouveauMdpComponent },
  { path: 'update-user',component:UpdateUserComponent, canActivate: [mdpTempGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
