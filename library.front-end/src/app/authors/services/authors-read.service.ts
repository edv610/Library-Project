import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthorsReadService {
  constructor(private http: HttpClient) {}

  getAuthors() {
    return this.http.get<any[]>('http://localhost:8080/authors/all');
  }

  getAuthorDetails(authorId: number) {
    return this.http.get<any>(
      `http://localhost:8080/authors/details/${authorId}`
    );
  }

  deleteAuthor(authorId: number) {
    return this.http.delete<any>(
      `http://localhost:8080/authors/delete/${authorId}`
    );
  }
}
