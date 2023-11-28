import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/models/user';

@Component({
  selector: 'app-gestion-admin',
  templateUrl: './gestion-admin.component.html',
  styleUrls: ['./gestion-admin.component.css'],
  providers: [MessageService]
})
export class GestionAdminComponent implements OnInit{

  loading : boolean = false;
  loggedUser !: User;
  users !: User[];
  addUser !: User;
  roles !: String[];
  visibleDiagAdd : boolean = false;
  visibleDiagTri : boolean = false;
  addUserForm !: FormGroup;
  formTri !: FormGroup;

  constructor(
    private userService : UserService,
    private fb: FormBuilder,
    private messageService: MessageService,
    private authService : AuthService) { }

  categories: any[] = [
    { name: 'Afficher uniquement les admins', key: 'admin' },
    { name: 'Afficher uniquement les gestionnaires', key: 'gestionnaire' },
    { name: 'Afficher uniquement les coureurs', key: 'coureur' },
    { name: 'Afficher tous les utilisateurs', key: 'all' }
  ];

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

    this.formTri = this.fb.group({
      tri : ['', [Validators.required]]
    })
    this.loggedUser = new User();
    this.getLoggedUser();
    this.getUsers();
  }

  getLoggedUser(){
    this.authService.getUserWithToken(this.authService.getLoggedInToken()).subscribe((res)=>{
      this.loggedUser = res
      console.log(this.loggedUser)
    })
  }

  getUsers(){
    this.userService.getAll().subscribe((res)=>{
      this.users = res;
    })
  }

  showDialogAdd(){
    this.visibleDiagAdd = true;
    this.visibleDiagTri = false;
  }

  showDialogTri(){
    this.visibleDiagAdd = false;
    this.visibleDiagTri = true;
  }

  ajoutUser(){
    this.loading =true;
    this.addUser = new User();
    this.addUser.email = this.addUserForm.value.email;
    this.addUser.nom = this.addUserForm.value.nom;
    this.addUser.prenom = this.addUserForm.value.prenom;
    this.addUser.role = this.addUserForm.value.role;
    for (let i = 0; i < this.addUser.role.length; i++) {
      this.addUser.role[i]=this.addUser.role[i].toUpperCase();
    }
    this.userService.add(this.addUser).subscribe((res)=>{
      this.addUserForm.reset();
      this.visibleDiagAdd = false;
      this.messageService.add({ severity: 'success', summary: 'Ajout réussi !', detail: 'Vous avez ajouté un utilisateur.' });
      this.getUsers();
      this.loading =false;
    },(error)=>{
      this.loading =false;
      this.messageService.add({ severity: 'error', summary: 'Une erreur est survenue !', detail: `${error.error}` });
    })
  }

  trier(){
    if (this.formTri.value.tri === "all") {
      this.getUsers();
      this.visibleDiagTri = false;
      this.formTri.reset()
    } else {
      this.userService.get(this.formTri.value.tri).subscribe((res)=>{
        this.users = res;
        this.visibleDiagTri = false;
        this.formTri.reset()
      })
    }
  }

}
