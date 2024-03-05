import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
})
export class BooksComponent {
  constructor(private router: Router) {}

  newBook() {
    this.router.navigate(['/livros/cadastro']);
  }

  listBooks() {
    this.router.navigate(['/livros/listar']);
  }

  booksRelations() {
    this.router.navigate(['/livros/relacao']);
  }
}
