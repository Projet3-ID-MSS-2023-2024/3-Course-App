import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Message } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-confirm-inscription',
  templateUrl: './confirm-inscription.component.html',
  styleUrls: ['./confirm-inscription.component.css']
})
export class ConfirmInscriptionComponent implements OnInit{

  messages!: Message[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
    ) { }

  ngOnInit(): void {

    if (this.authService.isUserLoggedIn()) {
      this.router.navigateByUrl('/accueil');
    } else {
      // on récupère le code qui se trouve dans l'url
      const code = this.route.snapshot.paramMap.get('code');
      // on tente de confirmer l'inscirption avec ce code
      this.authService.confirmInscription(code).subscribe((res)=>{
        if (res===true) {
          this.messages = [{ severity: 'success', summary: 'Validé', detail: 'Votre adresse mail a bien été validé.' }];
        } else {this.messages = [{ severity: 'error', summary: 'Erreur', detail: 'Une erreur est survenue.' }];}
      },(error)=>{
        this.messages = [{ severity: 'error', summary: 'Erreur', detail: 'Une erreur est survenue.' }];
      })
    }
  }

}
