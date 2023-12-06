import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/models/user';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  providers:[ConfirmationService, MessageService]
})
export class UserProfileComponent implements OnInit{
  loggedUser!:User;

  constructor(
    private router: Router,
    private authService: AuthService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.loggedUser = new User();
    if (this.authService.isUserLoggedIn()) {      // on vérifie qu'il y a un token en LC
      this.loadLoggedUser();
    }
  }
  loadLoggedUser(){
    this.authService.getUserWithToken(this.authService.getLoggedInToken()).subscribe((res)=>{
      this.loggedUser= res;
      console.log(this.loggedUser)
    })
  }



  deleteUser(id :Number){
    this.userService.delUser(id).subscribe(()=>{
      this.messageService.add({ severity: 'success', summary: 'Suppression réussie !', detail: 'Vous avez supprimé Votre compte' });
      
    },(error)=>{
      this.messageService.add({ severity: 'error', summary: 'Une erreur est survenue !', detail: 'erreur' });
    })
  }


}
