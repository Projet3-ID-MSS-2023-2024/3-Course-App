import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if(authService.isUserLoggedIn()){
    authService.getUserWithToken(authService.getLoggedInToken()).subscribe(()=>{
    },()=>{
      authService.logout();
      location.reload();
    })
  } else {
    router.navigateByUrl('/accueil');
  }

  return true;
};
