import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/models/user';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css'],
  providers: [MessageService]
})
export class InscriptionComponent implements OnInit{

  inscriptionForm !: FormGroup;
  user !: User;

  constructor(
    private fb: FormBuilder,
    private authService : AuthService,
    private messageService: MessageService,
    private router: Router
    ){}

  ngOnInit(): void {
    this.user = new User();
    this.inscriptionForm = this.fb.group({
      nom:['', Validators.required],
      prenom:['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mdp: ['', Validators.required],
      mdp2 : ['',Validators.required]
    })
  }

  inscription(){
    if (this.inscriptionForm.value.mdp === this.inscriptionForm.value.mdp2) {
      this.user.nom = this.inscriptionForm.value.nom;
      this.user.prenom = this.inscriptionForm.value.prenom;
      this.user.email = this.inscriptionForm.value.email;
      this.user.mdp = this.inscriptionForm.value.mdp;

      this.authService.register(this.user).subscribe(()=>{
        this.router.navigateByUrl('/login');
      },(error)=>{
        this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'erreur back' });
      })
    } else {
      this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'erreur' });
    }
  }
}