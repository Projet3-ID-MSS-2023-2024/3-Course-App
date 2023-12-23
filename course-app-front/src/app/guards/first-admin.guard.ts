import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const firstAdminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  authService.countUserDb().subscribe((res)=>{
    if (res==false) {
      router.navigateByUrl('/accueil');
    }
  })
  return true;
};
