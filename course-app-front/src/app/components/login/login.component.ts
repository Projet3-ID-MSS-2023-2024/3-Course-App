import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';
import { TokenResponse } from 'src/models/tokenResponse';
import { User } from 'src/models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit{


  connexionForm!:FormGroup;
  user!:User;
  tokenResponse!:TokenResponse;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService :AuthService,
    private messageService: MessageService) { }

  ngOnInit(): void {
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
        this.router.navigateByUrl('/creer/mdp');
      } else {this.router.navigateByUrl('/accueil');}
    },(error)=>{
      this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'erreur' });
    });

  }
}
