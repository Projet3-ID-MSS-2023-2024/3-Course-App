import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { BtnStateService } from 'src/app/services/btn-state.service';
import { User } from 'src/models/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [ConfirmationService]
})
export class NavbarComponent implements OnInit {
  items: MenuItem[] | undefined;
  item!:MenuItem;
  loggedUser!:User;
  log!:boolean;
  btnDisable$!:Observable<boolean>;
  tempMdp!:Observable<boolean>;

  constructor(
    private router: Router,
    private authService: AuthService,
    private confirmationService: ConfirmationService,
    private btnStateService : BtnStateService) { }

  ngOnInit() {
    this.loggedUser = new User();
    this.btnDisable$ = this.btnStateService.btnDisable$;
    this.tempMdp = this.btnStateService.tempMdp;
    if (this.authService.isUserLoggedIn()) {      // on vérifie qu'il y a un token en LC
      this.log=true;
      this.loadLoggedUser();
    } else {
      this.log=false;
      this.loadItemsNoLog();
    }
  }

  loadItemsNoLog(){
    this.items = [
      {
          label: 'Accueil',
          icon: 'pi pi-fw pi-home',
          command: ()=>{
            this.btnStateService.setState(false);
          },
          routerLink: '/accueil'
      },
      {
          label: 'Courses',
          icon: 'pi pi-fw pi-flag',
          command: ()=>{
            this.btnStateService.setState(false);
          },
          routerLink: '/courses'
      },
      {
          label: 'Résultats',
          icon: 'pi pi-fw pi-bars',
          command: ()=>{
            this.btnStateService.setState(false);
          },
          routerLink: '/resultats'
      }
    ];
  }

  loadItems(user:User){
    if (!user.tempMdp) {
      this.items = [
        {
            label: 'Accueil',
            icon: 'pi pi-fw pi-home',
            routerLink: '/accueil'
        },
        {
            label: 'Courses',
            icon: 'pi pi-fw pi-flag',
            routerLink: '/courses'
        }
      ];

      if (user.role.includes("COUREUR")) {
        this.item = {
          label: 'Résultats',
            icon: 'pi pi-fw pi-bars',
            items: [
              {
                label: 'Résultats des courses',
                icon: 'pi pi-fw pi-chart-bar',
                routerLink: '/resultats'
              },
              {
                label: 'Résultats personnels',
                icon: 'pi pi-fw pi-chart-bar',
                routerLink: '/resultats/personnel'
              },
          ]
        }
        this.items.push(this.item);
      } else {
        this.item = {
          label: 'Résultats des courses',
          icon: 'pi pi-fw pi-chart-bar',
          routerLink: '/resultats'
        }
        this.items.push(this.item);
      }

      if (user.role.includes("GESTIONNAIRE")) {
        this.item = {
          label: 'Administration Courses',
          icon: 'pi pi-fw pi-bars',
          items: [
            {
              label: 'Gestion des courses',
              icon: 'pi pi-fw pi-cog',
              routerLink: '/courses/admin'
            },
            {
              label: 'Affichage courses supprimées',
              icon: 'pi pi-fw pi-eye',
              routerLink: '/courses/admin/supprimees'
            },
            {
                label: 'Encoder des résultats',
                icon: 'pi pi-fw pi-plus',
                routerLink:'/resultats/admin'
            },
            {
                label: 'Modifier des résultats',
                icon: 'pi pi-fw pi-pencil',
                routerLink:'/resultats/admin/modif'
            },
          ]
        }
        this.items.push(this.item);
      }

      if (user.role.includes("ADMIN")) {
        this.item = {
          label: 'Administration',
          icon: 'pi pi-fw pi-sitemap',
          routerLink: '/administration'
        }
        this.items.push(this.item);
      }

      let finalItem = {
        label: 'Mon compte',
        icon: 'pi pi-fw pi-user-edit',
        routerLink:'/user-profile'
      }
      this.items.push(finalItem);
    } else {
      this.items = [
        {
            label: 'Creer son mot de passe',
            icon: 'pi pi-fw pi-key'
        }
      ]
    }
  }

  loadLoggedUser(){
    this.authService.getUserWithToken(this.authService.getLoggedInToken()).subscribe((res)=>{
      this.loggedUser= res;
      if (this.loggedUser.tempMdp) {
        this.btnStateService.setTempMdp(true);
      }
      this.loadItems(this.loggedUser);
    })
  }

  login(){
    this.btnStateService.setState(true);
    this.router.navigateByUrl('/login')
  }

  confirmLogOut(){
    this.confirmationService.confirm({
      message: 'Voulez-vous vraiment vous déconnecter ?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          this.logout();
      }
  });
  }

  logout() {
    this.authService.logout();
    location.reload();
  }
}
