import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MenubarModule } from 'primeng/menubar';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { ToastModule } from 'primeng/toast';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
    AdresseAddComponent
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
    MessagesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
