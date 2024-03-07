import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { BooksService } from '../../services/books.service';

@Component({
  selector: 'app-books-details',
  templateUrl: './books-details.component.html',
  styleUrls: ['./books-details.component.scss'],
})
export class BooksDetailsComponent {
  booksSubscribe: Subscription = new Subscription();
  booksId!: number;
  booksDetails: any;

  constructor(
    private router: Router,
    private routeData: ActivatedRoute,
    private bookService: BooksService
  ) {}

  ngOnInit(): void {
    this.booksSubscribe = this.routeData.params?.subscribe((params) => {
      this.booksId = +params['id'];
      this.loadBookDetails();
    });
  }

  ngOnDestroy(): void {
    this.booksSubscribe.unsubscribe();
  }

  loadBookDetails() {
    this.bookService.getBookById(this.booksId)?.subscribe((details) => {
      this.booksDetails = details;
    });
  }

  onDelete() {
    let confirmation = confirm('Deseja deletar o Editora?');

    if (confirmation) {
      this.bookService.deleteBook(this.booksId)?.subscribe(
        (response) => {
          alert(`${response.status}`);
          setTimeout(() => {
            window.location.href = '/livros/listar';
          }, 500);
        },
        (error) => {
          alert('Erro ao deletar o livro, tente novamente.');
          console.log('Erro ao deletar livro: ', error);
        }
      );
    }
  }

  onEdit() {
    this.router.navigate([`/livros/listar/editar/${this.booksId}`]);
  }
}
