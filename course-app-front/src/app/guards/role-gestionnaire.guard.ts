import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { User } from 'src/models/user';

export const roleGestionnaireGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if(authService.isUserLoggedIn()){
    authService.getUserWithToken(authService.getLoggedInToken()).subscribe((res)=>{
      let user : User = res;
      if (!user.role.includes("GESTIONNAIRE")) {
        router.navigateByUrl('/accueil');
      }
    },()=>{
      authService.logout();
      location.reload();
    })
  } else {
    router.navigateByUrl('/accueil');
  }
  return true;
};
