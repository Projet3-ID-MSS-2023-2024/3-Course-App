import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { User } from 'src/models/user';

export const roleAdminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if(authService.isUserLoggedIn()){
    authService.getUserWithToken(authService.getLoggedInToken()).subscribe((res)=>{
      let user : User = res;
      if (!user.role.includes("ADMIN")) {
        router.navigateByUrl('/accueil');
      }
    },()=>{
      authService.logout();
      router.navigateByUrl('/accueil');
    })
  } else {
    router.navigateByUrl('/accueil');
  }
  return true;
};
