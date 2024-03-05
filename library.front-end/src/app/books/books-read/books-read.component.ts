import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BooksService } from '../services/books.service';

@Component({
  selector: 'app-books-read',
  templateUrl: './books-read.component.html',
  styleUrls: ['./books-read.component.scss'],
})
export class BooksReadComponent {
  books: any[] = [];
  constructor(private router: Router, private booksService: BooksService) {
    this.loadData();
  }

  loadData() {
    this.booksService.getBooks()?.subscribe(
      (response) => {
        this.books = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onCancel() {
    this.router.navigate(['/livros']);
  }
}
