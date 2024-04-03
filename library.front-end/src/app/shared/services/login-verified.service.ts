import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginVerifiedService {
  verifiedUser: boolean = false;

  toggleVerifiedUser() {
    setTimeout(() => {
      this.verifiedUser = !this.verifiedUser;
    }, 2000);
  }

  userIsVerified() {
    return this.verifiedUser;
  }
}
