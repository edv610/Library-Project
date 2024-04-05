// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root',
// })
// export class LoginVerifiedService {
//   verifiedUser: boolean = false;

//   toggleVerifiedUser() {
//     this.verifiedUser = !this.verifiedUser;
//   }

//   userIsVerified() {
//     return this.verifiedUser;
//   }
// }
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginVerifiedService {
  verifiedUser: boolean = false;
  private readonly STORAGE_KEY = 'loggedIn';

  constructor() {
    this.verifiedUser = this.getStoredLoginState();
  }

  private getStoredLoginState(): boolean {
    return localStorage.getItem(this.STORAGE_KEY) === 'true';
  }

  private storeLoginState(state: boolean): void {
    localStorage.setItem(this.STORAGE_KEY, state.toString());
  }

  toggleVerifiedUser() {
    this.verifiedUser = !this.verifiedUser;
    this.storeLoginState(this.verifiedUser);
  }

  userIsVerified() {
    return this.verifiedUser;
  }
}
