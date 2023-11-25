import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/models/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  items: MenuItem[] | undefined;
  loggedUser!:User;

  constructor(
    private router: Router,
    private authService: AuthService) { }

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
            label: 'Mon compte',
            icon: 'pi pi-fw pi-user-edit',
        }
      ];
  }

  loadLoggedUser(){
    this.authService.getUserWithToken(this.authService.getLoggedInToken()).subscribe((res)=>{
      this.loggedUser= res;
      console.log(this.loggedUser)
    })
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}
