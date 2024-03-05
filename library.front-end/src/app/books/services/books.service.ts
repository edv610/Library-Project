import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class BooksService {
  constructor(private http: HttpClient) {}

  getAuthors() {
    return this.http.get<any[]>('http://localhost:8080/authors/all');
  }

  getPublishers() {
    return this.http.get<any[]>('http://localhost:8080/publisher/all');
  }

  createBook(book: any) {
    return this.http.post<any>('http://localhost:8080/book/create', book);
  }

  getBooks() {
    return this.http.get<any>('http://localhost:8080/book/all');
  }

  getBookById(bookId: any) {
    return this.http.get<any>(`http://localhost:8080/book/details/${bookId}`);
  }

  deleteBook(bookId: any) {
    return this.http.delete<any>(`http://localhost:8080/book/delete/${bookId}`);
  }

  updateBook(bookId: any, book: any) {
    return this.http.put<any>(
      `http://localhost:8080/book/update/${bookId}`,
      book
    );
  }

  getBookRelation() {
    return this.http.get<any>('http://localhost:8080/book/relations');
  }
}
