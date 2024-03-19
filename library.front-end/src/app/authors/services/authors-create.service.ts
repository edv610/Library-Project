import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AuthorsCreateService {
  constructor(private http: HttpClient) {}

  createAuthor(data: any) {
    return this.http.post<any>('http://localhost:8080/authors', data);
  }
}
