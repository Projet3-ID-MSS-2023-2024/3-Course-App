import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/models/user';

@Component({
  selector: 'app-first-register',
  templateUrl: './first-register.component.html',
  styleUrls: ['./first-register.component.css'],
})
export class FirstRegisterComponent implements OnInit{

  loading : boolean =false;
  registerForm!:FormGroup;
  user!:User;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private messageService: MessageService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.user = new User();
    this.registerForm = this.fb.group({
      nom:['', Validators.required],
      prenom:['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mdp: ['', Validators.required],
      mdp2 : ['',Validators.required]
    })
  }

  register(){
    if (this.registerForm.value.mdp === this.registerForm.value.mdp2) {
      this.loading = true;
      this.user.nom = this.registerForm.value.nom;
      this.user.prenom = this.registerForm.value.prenom;
      this.user.email = this.registerForm.value.email;
      this.user.mdp = this.registerForm.value.mdp;

      this.authService.addFirstAdmin(this.user).subscribe(()=>{
        this.loading = false;
        location.reload();
      },(error)=>{
        this.loading = false;
        this.messageService.add({ severity: 'error', summary: 'Une erreur est survenue !', detail: `${error.error}` });
      })
    } else {
      this.messageService.add({ severity: 'error', summary: 'Une erreur est survenue !', detail: 'Les mots de passe ne correspondent pas.' });
    }
  }
}
