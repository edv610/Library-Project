import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class BooksService {
  constructor(private http: HttpClient) {}

  getAuthors() {
    return this.http.get<any[]>('http://localhost:8080/authors');
  }

  getPublishers() {
    return this.http.get<any[]>('http://localhost:8080/publisher');
  }

  createBook(book: any) {
    return this.http.post<any>('http://localhost:8080/book', book);
  }

  getBooks() {
    return this.http.get<any>('http://localhost:8080/book');
  }

  getBookById(bookId: any) {
    return this.http.get<any>(`http://localhost:8080/book/${bookId}`);
  }

  deleteBook(bookId: any) {
    return this.http.delete<any>(`http://localhost:8080/book/${bookId}`);
  }

  updateBook(bookId: any, book: any) {
    return this.http.put<any>(`http://localhost:8080/book/${bookId}`, book);
  }

  getBookRelation() {
    return this.http.get<any>('http://localhost:8080/book/relations');
  }
}
