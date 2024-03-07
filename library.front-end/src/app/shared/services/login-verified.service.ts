import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginVerifiedService {
  verifiedUser: boolean = false;

  toggleVerifiedUser() {
    this.verifiedUser = !this.verifiedUser;
  }

  userIsVerified() {
    return this.verifiedUser;
  }
}
