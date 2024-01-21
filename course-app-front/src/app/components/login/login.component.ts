import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';
import { TokenResponse } from 'src/models/tokenResponse';
import { User } from 'src/models/user';
import { NavbarComponent } from '../navbar/navbar.component';
import { BtnStateService } from 'src/app/services/btn-state.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit{


  connexionForm!:FormGroup;
  user!:User;
  tokenResponse!:TokenResponse;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService :AuthService,
    private messageService: MessageService,
    private btnStateService: BtnStateService) { }

  ngOnInit(): void {
    if (this.authService.isUserLoggedIn()) {
      this.router.navigateByUrl('/accueil');
    }
    this.btnStateService.setState(true)
    this.user = new User();
    this.connexionForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      mdp: ['', Validators.required]
    })
  }

  login() {
    this.user.email = this.connexionForm.value.email;
    this.user.mdp = this.connexionForm.value.mdp;
    this.authService.authentication(this.user).subscribe((res)=>{
      this.tokenResponse = res;
      this.authService.authSuccess(this.tokenResponse.token);
      if (this.tokenResponse.tempMdp) {
        location.reload();
      } else {
        location.reload();
      }
    },(error)=>{
      this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'erreur' });
    });

  }

  inscription(){
    this.router.navigateByUrl('/inscription')
  }
}
