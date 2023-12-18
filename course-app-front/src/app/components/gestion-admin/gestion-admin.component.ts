import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/models/user';

@Component({
  selector: 'app-gestion-admin',
  templateUrl: './gestion-admin.component.html',
  styleUrls: ['./gestion-admin.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class GestionAdminComponent implements OnInit{

  progressBar: boolean = false;
  items: MenuItem[];
  usersDel : boolean =false;
  loading : boolean = false;
  loggedUser !: User;
  users !: User[];
  addUser !: User;
  roles !: String[];
  visibleDiagAdd : boolean = false;
  addUserForm !: FormGroup;
  cols: any[] = [];

  constructor(
    private userService : UserService,
    private fb: FormBuilder,
    private messageService: MessageService,
    private confirmationService : ConfirmationService,
    private authService : AuthService
    ) {
      this.items = [
        {
            label: 'Ajouter',
            icon: 'pi pi-plus',
            command: () => {
                this.showDialogAdd();
            }
        },
        {
            label: 'Utilisateurs supprimés',
            icon: 'pi pi-users',
            command: () => {
                this.listDel();
            }
        }
    ];
     }

  ngOnInit(): void {

    this.cols = [
      { field: "nom", header: "Nom" },
      { field: "prenom", header: "Prenom" },
      { field: "email", header: "Email" },
      { field: "role", header: "Role" }
    ];

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
      this.usersDel = false;
    })
  }

  clear(table: Table) {
    table.clear();
  }

  showDialogAdd(){
    this.visibleDiagAdd = true;
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

  listDel(){
    this.userService.getDel().subscribe((res)=>{
      this.users = res;
      this.usersDel =true;
    })
  }

  confirmDelete(id :number){
    this.confirmationService.confirm({
      message: 'Voulez-vous vraiment supprimer cet utilisateur ?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          this.deleteUser(id);
      },
      reject: () => {
        this.messageService.add({severity: 'info', summary: 'Annulation', detail: ''})
      }
  });
  }
  confirmNewMdpTemp(id :number){
    this.confirmationService.confirm({
      message: 'Voulez-vous generer un nouveau mot de passe temporaire pour cet utilisateur ?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          this.newMdpTemp(id);
      },
      reject: () => {
        this.messageService.add({severity: 'info', summary: 'Annulation', detail: ''})
      }
  });
  }

  confirmActive(id :number){
    this.confirmationService.confirm({
      message: 'Voulez-vous vraiment réactiver cet utilisateur ?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          this.activeUser(id);
      },
      reject: () => {
        this.messageService.add({severity: 'info', summary: 'Annulation', detail: ''})
      }
  });
  }

  deleteUser(id :Number){
    this.userService.delUser(id).subscribe(()=>{
      this.messageService.add({ severity: 'success', summary: 'Suppression réussie !', detail: 'Vous avez supprimé un utilisateur.' });
      this.getUsers();
    },(error)=>{
      this.messageService.add({ severity: 'error', summary: 'Une erreur est survenue !', detail: 'erreur' });
    })
  }

  activeUser(id:number){
    this.progressBar = true;
    this.userService.activeUser(id).subscribe(()=>{
      this.progressBar=false;
      this.messageService.add({ severity: 'success', summary: 'Réactivation réussie !', detail: 'Un mail a été envoyé '
       +'à l\'utilisateur pour l\'avertir de la réactivation de son compte.' });
      this.listDel();
    },(error)=>{
      this.progressBar=false;
      this.messageService.add({ severity: 'error', summary: 'Une erreur est survenue !', detail: 'erreur' });
    })
  }

  newMdpTemp(id:number){
    this.progressBar = true;
    this.userService.newMdpTemp(id).subscribe(()=>{
      this.progressBar=false;
      this.messageService.add({ severity: 'success', summary: 'Nouveau mot de passe temporaire !', detail: 'Un mail a été envoyé '
       +'à l\'utilisateur pour l\'avertir de son nouveau mot de passe temporaire.' });
      this.getUsers();
    },(error)=>{
      this.progressBar=false;
      this.messageService.add({ severity: 'error', summary: 'Une erreur est survenue !', detail: `${error.error}` });
    })
  }

}
