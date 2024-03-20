import {
  Component,
  TemplateRef,
  Output,
  EventEmitter,
  Input,
} from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';

import { BooksService } from '../services/books.service';

@Component({
  selector: 'app-books-read',
  templateUrl: './books-read.component.html',
  styleUrls: ['./books-read.component.scss'],
})
export class BooksReadComponent {
  books: any[] = [];
  modalRef?: BsModalRef;

  @Input() booksId!: number;

  @Output() formSubmitted: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private router: Router,
    private booksService: BooksService,
    private modalService: BsModalService
  ) {
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

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  onCancel() {
    this.router.navigate(['/livros']);
  }

  newBook(template: TemplateRef<void>) {
    this.modalRef = this.modalService.show(template);
  }

  onDelete() {
    let confirmation = confirm('Deseja deletar o Editora?');

    if (confirmation) {
      this.booksService.deleteBook(this.booksId)?.subscribe(
        (response) => {
          alert(`${response.status}`);
          setTimeout(() => {
            this.router.navigate(['/livros']);
          }, 500);
        },
        (error) => {
          alert('Erro ao deletar o livro, tente novamente.');
          console.log('Erro ao deletar livro: ', error);
        }
      );
    }
  }

  booksRelations() {
    this.router.navigate(['/livros/relatorio']);
  }
}
