import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/models/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [ConfirmationService]
})
export class NavbarComponent implements OnInit {
  items: MenuItem[] | undefined;
  loggedUser!:User;

  constructor(
    private router: Router,
    private authService: AuthService,
    private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.loggedUser = new User();
    if (this.authService.isUserLoggedIn()) {      // on vérifie qu'il y a un token en LC
      this.loadLoggedUser();
    }

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
        },
        {
            label: 'Résultats',
            icon: 'pi pi-fw pi-chart-bar',
        },
        {
          label: 'Administration Courses',
          icon: 'pi pi-fw pi-cog',
          routerLink: '/courses/admin'
        },
        {
          label: 'Administration Résultats',
          icon: 'pi pi-fw pi-bars',
          items: [
              {
                  label: 'Encoder des résultats',
                  icon: 'pi pi-fw pi-plus',
                  routerLink:'/resultats/admin'
              },
              {
                  label: 'Modifier des résultats',
                  icon: 'pi pi-fw pi-pencil',
                  routerLink:'/resultats/admin'
              },
          ]
      },
        {
          label: 'Administration',
          icon: 'pi pi-fw pi-sitemap',
          routerLink: '/administration'
        },
        {
            label: 'Mon compte',
            icon: 'pi pi-fw pi-user-edit',
            routerLink:'/user-profile'
        }
      ];
  }

  loadLoggedUser(){
    this.authService.getUserWithToken(this.authService.getLoggedInToken()).subscribe((res)=>{
      this.loggedUser= res;
      console.log(this.loggedUser)
    })
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
    this.router.navigateByUrl('/login');
  }
}
