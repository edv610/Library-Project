import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthorsService {
  constructor(private http: HttpClient) {}

  getAuthors() {
    return this.http.get<any[]>('http://localhost:8080/authors');
  }

  getAuthorDetails(authorId: number) {
    return this.http.get<any>(`http://localhost:8080/authors/${authorId}`);
  }

  deleteAuthor(authorId: number) {
    return this.http.delete<any>(`http://localhost:8080/authors/${authorId}`);
  }

  updateAuthor(dataName: any, dataId: any) {
    return this.http.put<any>(
      `http://localhost:8080/authors/${dataId}`,
      dataName
    );
  }

  createAuthor(data: any) {
    return this.http.post<any>('http://localhost:8080/authors', data);
  }
}
