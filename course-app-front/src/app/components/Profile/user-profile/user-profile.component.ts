import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { ChangePassword } from 'src/models/changePassword';
import { User } from 'src/models/user';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  providers:[ConfirmationService, MessageService]
})
export class UserProfileComponent implements OnInit{
  loggedUser!:User;
  changePassword!: ChangePassword;
  visible: boolean = false;
  show: boolean = false;
  showPassword: boolean = false;
  showMail: boolean = false;
  UpdateForm!: any;
  user !: User;
  

  constructor(
    private router: Router,
    private authService: AuthService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private userService: UserService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.loggedUser = new User();
    this.user = new User();
    this.changePassword = new ChangePassword();
    if (this.authService.isUserLoggedIn()) {      // on vérifie qu'il y a un token en LC
      this.loadLoggedUser();
    }
    this.UpdateForm = this.fb.group({
      nom: ['',Validators.required],
      prenom: ['',Validators.required],
      email: ['',Validators.required],
      currentPassword: ['',Validators.required],
      newPassword: ['',Validators.required],
      confirmationPassword: ['',Validators.required]
    });
  }
  loadLoggedUser(){
    this.authService.getUserWithToken(this.authService.getLoggedInToken()).subscribe((res)=>{
      this.loggedUser= res;
      console.log(this.loggedUser)
    })
  }

  showDialogName() {
    this.visible = true;
}

showDialogFirstName() {
  this.show = true;
}

showDialogMail() {
  this.showMail = true;
}
showDialogPassword() {
  this.showPassword = true;
}
  deleteUser(id :Number){
    this.userService.delUser(id).subscribe(()=>{
      this.messageService.add({ severity: 'success', summary: 'Suppression réussie !', detail: 'Vous avez supprimé Votre compte' });
      
    },(error)=>{
      this.messageService.add({ severity: 'error', summary: 'Une erreur est survenue !', detail: 'erreur' });
    })
  }

  updateUserName(id: number){
    this.user.nom = this.UpdateForm.value.nom;
    this.userService.updateUserName(id, this.user).subscribe(()=>{
      this.router.navigateByUrl('/user-profile');
    },(error)=>{
      this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'erreur back' });
    })
  }

  updateUserPrenom(id: number){
    this.user.prenom = this.UpdateForm.value.prenom;
    console.log(this.user.prenom);
    console.log(this.UpdateForm.value.prenom);
    this.userService.updateUserPrenom(id, this.user).subscribe(()=>{
      this.router.navigateByUrl('/user-profile');
    },(error)=>{
      this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'erreur back' });
    })
  }

  updateUserMail(id: number){
    this.user.email = this.UpdateForm.value.email;
    console.log(this.user.email);
    console.log(this.UpdateForm.value.email);
    this.userService.updateUserMail(id, this.user).subscribe(()=>{
      this.router.navigateByUrl('/user-profile');
    },(error)=>{
      this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'erreur back' });
    })
  }

  updateUserPassword(id: number, changePassword: ChangePassword){
    this.changePassword.currentPassword = this.UpdateForm.value.currentPassword;
    this.changePassword.newPassword = this.UpdateForm.value.newPassword;
    this.changePassword.confirmationPassword = this.UpdateForm.value.confirmationPassword;
    this.userService.updateUserPassword(id, this.changePassword).subscribe(()=>{
      this.router.navigateByUrl('/user-profile');
    },(error)=>{
      this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'erreur back' });
    })
  }
}
