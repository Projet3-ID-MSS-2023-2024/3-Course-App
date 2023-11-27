import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/models/user';

@Component({
  selector: 'app-gestion-admin',
  templateUrl: './gestion-admin.component.html',
  styleUrls: ['./gestion-admin.component.css']
})
export class GestionAdminComponent implements OnInit{

  users !: User[];
  roles !: String[];
  SelectRoles !: String[];
  visibleDiag : boolean = false;
  addUserForm !: FormGroup;

  constructor(
    private userService : UserService,
    private fb: FormBuilder) { }

  ngOnInit(): void {

    this.roles = [
      "Admin",
      "Gestionnaire",
      "Coureur"
    ];

    this.addUserForm = this.fb.group({
      nom: ['', [Validators.required]],
      prenom: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      role: ['', [Validators.required]]
    })

    this.getUsers();
  }

  getUsers(){
    this.userService.getAll().subscribe((res)=>{
      this.users = res;
      console.log(this.users)
    })
  }

  showDialog(){
    this.visibleDiag = true;
  }

  ajoutUser(){
    console.log(this.addUserForm.value.role)
  }

}
