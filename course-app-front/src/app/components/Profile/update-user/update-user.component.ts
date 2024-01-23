import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/models/user';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css'],
})
export class UpdateUserComponent implements OnInit {
  UpdateUserForm!: FormGroup;
  user !: User;
  loggedUser !: User;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService,
    private authService: AuthService,
    private messageService: MessageService) { }
    

  ngOnInit(): void {
    this.loggedUser = new User();
    this.getLoggedUser();
    this.user = new User();
    this.UpdateUserForm = this.fb.group({
      nom: ['',Validators.required],
      prenom: ['',Validators.required],
      mail: ['',Validators.required],
    })
  }

  updateUserName(id: number){
    this.user.nom = this.UpdateUserForm.value.nom;
    this.userService.updateUserName(id, this.user).subscribe(()=>{
      this.router.navigateByUrl('/update-user');
    },(error)=>{
      this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'erreur back' });
    })
  }

  updateUserPrenom(id: number){
    this.user.prenom = this.UpdateUserForm.value.prenom;
    this.userService.updateUserPrenom(id, this.user).subscribe(()=>{
      this.router.navigateByUrl('/update-user');
    },(error)=>{
      this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'erreur back' });
    })
  }

  updateUserMail(id: number){
    this.user.email = this.UpdateUserForm.value.email;
    this.userService.updateUserPrenom(id, this.user).subscribe(()=>{
      this.router.navigateByUrl('/update-user');
    },(error)=>{
      this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'erreur back' });
    })
  }

  getLoggedUser(){
    this.authService.getUserWithToken(this.authService.getLoggedInToken()).subscribe((res)=>{
      this.loggedUser = res
      console.log(this.loggedUser)
    })
  }
  


}
