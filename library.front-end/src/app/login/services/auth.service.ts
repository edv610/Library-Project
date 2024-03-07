import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LoginAuthService {
  constructor(private http: HttpClient) {}

  authUser(user: any) {
    return this.http.post<any>('http://localhost:8080/login', user);
  }
}
