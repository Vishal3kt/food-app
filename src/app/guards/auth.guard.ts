import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const storedData = localStorage.getItem('userInfo');

  if (storedData) {
    const parsedData = JSON.parse(storedData);
    const token = parsedData;

    if (token) {
      return true;
    }
  }

  router.navigate(['/dashboard/add-user']);
  return false;
};
