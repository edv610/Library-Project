import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BooksService } from '../services/books.service';

@Component({
  selector: 'app-books-relations',
  templateUrl: './books-relations.component.html',
  styleUrls: ['./books-relations.component.scss'],
})
export class BooksRelationsComponent {
  booksRelations: any[] = [];

  constructor(private booksService: BooksService, private router: Router) {
    this.loadBookRelation();
  }

  loadBookRelation() {
    this.booksService.getBookRelation()?.subscribe(
      (data) => {
        this.booksRelations = data;
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
