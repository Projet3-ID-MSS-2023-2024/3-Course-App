import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MenubarModule } from 'primeng/menubar';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { ToastModule } from 'primeng/toast';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxPayPalModule } from 'ngx-paypal';
import { DataViewModule } from 'primeng/dataview';
import { TableModule } from 'primeng/table';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { ToolbarModule } from 'primeng/toolbar';
import { ListboxModule } from 'primeng/listbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FormsModule } from '@angular/forms';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ProgressBarModule } from 'primeng/progressbar';
import { TreeTableModule } from 'primeng/treetable';
import { FieldsetModule } from 'primeng/fieldset';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { TabViewModule } from 'primeng/tabview';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { AccueilComponent } from './components/accueil/accueil.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FirstRegisterComponent } from './components/first-register/first-register.component';
import { CourseAddComponent } from './components/Course/course-add/course-add.component';
import { InscriptionComponent } from './components/inscription/inscription/inscription.component';
import { ConfirmInscriptionComponent } from './components/inscription/confirm-inscription/confirm-inscription.component';
import { MessagesModule } from 'primeng/messages';
import { VilleAddComponent } from './components/Ville/ville-add/ville-add.component';
import { AdresseAddComponent } from './components/Adresse/adresse-add/adresse-add.component';
import { UserProfileComponent } from './components/Profile/user-profile/user-profile.component';
import { CoursesListComponent } from './components/Course/courses-list/courses-list.component';
import { CoursesListAdminComponent } from './components/Course/courses-list-admin/courses-list-admin.component';
import { GestionAdminComponent } from './components/gestion-admin/gestion-admin.component';
import { HttpInterceptorService } from './services/http-interceptor.service';
import { NouveauMdpComponent } from './components/nouveau-mdp/nouveau-mdp.component';
import { UpdateUserComponent } from './components/Profile/update-user/update-user.component';
import { GestionResultatsComponent } from './components/Resultats/gestion-resultats/gestion-resultats.component';
import { UpdateCourseAddComponent } from './components/Course/update-course-add/update-course-add.component';
import { CoursesDeleteListComponent } from './components/Course/courses-delete-list/courses-delete-list.component';
import { ModifResultatsComponent } from './components/Resultats/modif-resultats/modif-resultats.component';
import { ListResultatsComponent } from './components/Resultats/list-resultats/list-resultats.component';
import { ListResultatsPersonnelsComponent } from './components/Resultats/list-resultats-personnels/list-resultats-personnels.component';
import { MyCoursesComponent } from './components/Course/my-courses/my-courses.component';
import { MessageService } from 'primeng/api';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AccueilComponent,
    NavbarComponent,
    FirstRegisterComponent,
    CourseAddComponent,
    InscriptionComponent,
    ConfirmInscriptionComponent,
    VilleAddComponent,
    AdresseAddComponent,
    UserProfileComponent,
    CoursesListComponent,
    CoursesListAdminComponent,
    GestionAdminComponent,
    NouveauMdpComponent,
    UpdateUserComponent,
    GestionResultatsComponent,
    UpdateCourseAddComponent,
    CoursesDeleteListComponent,
    ModifResultatsComponent,
    ListResultatsComponent,
    ListResultatsPersonnelsComponent,
    MyCoursesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    InputTextModule,
    ButtonModule,
    HttpClientModule,
    ReactiveFormsModule,
    MenubarModule,
    AvatarModule,
    AvatarGroupModule,
    ToastModule,
    BrowserAnimationsModule,
    MessagesModule,
    NgxPayPalModule,
    DataViewModule,
    TableModule,
    ConfirmDialogModule,
    DialogModule,
    DropdownModule,
    TableModule,
    ToolbarModule,
    DialogModule,
    ListboxModule,
    RadioButtonModule,
    FormsModule,
    ProgressSpinnerModule,
    SplitButtonModule,
    ProgressBarModule,
    TreeTableModule,
    FieldsetModule,
    AutoCompleteModule,
    ScrollPanelModule,
    TabViewModule

  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: HttpInterceptorService,
    multi: true,
  },
  MessageService
],
  bootstrap: [AppComponent]
})
export class AppModule { }
