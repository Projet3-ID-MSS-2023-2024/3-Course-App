import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { User } from 'src/models/user';
import { inject } from '@angular/core';

export const mdpTempGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isUserLoggedIn()) {
    authService.getUserWithToken(authService.getLoggedInToken()).subscribe((res)=>{
      let user : User = res;
      if (user.tempMdp) {
        router.navigateByUrl('/creer/mdp');
      }
    },()=>{
      authService.logout();
      location.reload();
    })
  }
  return true;
};
