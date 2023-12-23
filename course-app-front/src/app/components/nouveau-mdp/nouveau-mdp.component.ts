import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/models/user';

@Component({
  selector: 'app-nouveau-mdp',
  templateUrl: './nouveau-mdp.component.html',
  styleUrls: ['./nouveau-mdp.component.css'],
  providers: [MessageService]
})
export class NouveauMdpComponent implements OnInit{

  form !: FormGroup;

  constructor(
    private router: Router,
    private fb : FormBuilder,
    private userService : UserService,
    private messageService: MessageService,
    private authService: AuthService){}

  ngOnInit(): void {
    this.authService.getUserWithToken(this.authService.getLoggedInToken()).subscribe((res)=>{
      let user : User = res;
      if (!user.tempMdp) {
        this.router.navigateByUrl('/accueil');
      }
    })
    this.form = this.fb.group({
      mdp : ['',Validators.required],
      mdp2 : ['',Validators.required]
    })
  }

  addMdp(){
    if(this.form.valid){
      if (this.form.value.mdp==this.form.value.mdp2) {
        this.userService.addMdp(this.form.value.mdp).subscribe((res)=>{
          if(res==true){
            location.reload();
          }
        },(error)=>{
          this.messageService.add({ severity: 'error', summary: 'Une erreur est survenue !', detail: `${error.error}` });
        })
      } else {
        this.messageService.add({ severity: 'error', summary: 'Une erreur est survenue !', detail: 'Les mots de passe de correspondent pas.' });
      }
    }
  }

}
