import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { LoginVerifiedService } from '../shared/services/login-verified.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private loginVerifiedService: LoginVerifiedService
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {
    return this.verifiedAccess();
  }

  verifiedAccess() {
    if (this.loginVerifiedService.userIsVerified()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
