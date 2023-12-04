import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/models/user';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css'],
  providers: [MessageService]
})
export class UpdateUserComponent implements OnInit {
  UpdateUserForm!: FormGroup;
  user!: User;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.user = new User();
    this.UpdateUserForm = this.fb.group({
      nom: ['',Validators.required],
      prenom: ['',Validators.required],
      mail: ['',Validators.required],
    })
  }

  updateUser(id: number){
    this.user.nom = this.UpdateUserForm.value.nom;
    this.user.prenom = this.UpdateUserForm.value.prenom;
    this.user.email = this.UpdateUserForm.value.mail;
    this.userService.updateUser(id, this.user).subscribe(()=>{
      this.router.navigateByUrl('/update-user');
    },(error)=>{
      this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'erreur back' });
    })
  }
  


}
