import { Component, TemplateRef, Input } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { EMPTY, Observable, Subject, catchError, takeUntil } from 'rxjs';

import { BooksService } from '../services/books.service';
import { Books } from '../books-interface';
import { AlertModalService } from 'src/app/shared/alert-modal/alert-modal.service';

@Component({
  selector: 'app-books-read',
  templateUrl: './books-read.component.html',
  styleUrls: ['./books-read.component.scss'],
})
export class BooksReadComponent {
  books$!: Observable<Books[]>;
  booksId!: number;
  loadKey: boolean = false;
  error$ = new Subject<boolean>();
  deleteSuccess: any;
  deleteError: any;
  private readonly unsubscribe$ = new Subject<void>();
  modalRef?: BsModalRef;

  constructor(
    private router: Router,
    private booksService: BooksService,
    private modalService: BsModalService,
    private alertService: AlertModalService
  ) {}

  ngOnInit() {
    this.error$.next(false);
  }

  loadData() {
    this.loadKey = true;
    setTimeout(() => {
      this.books$ = this.booksService.getBooks().pipe(
        takeUntil(this.unsubscribe$),
        catchError((error) => {
          console.error(error);
          this.alertService.alertModal('danger', 'Tente novamente mais tarde.');
          this.error$.next(true);
          return EMPTY;
        })
      );
    }, 2000);
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  newBook(template: TemplateRef<void>) {
    this.modalRef = this.modalService.show(template);
  }

  onDelete() {
    let confirmation = confirm('Deseja deletar o Livro?');
    if (confirmation) {
      this.booksService
        .deleteBook(this.booksId)
        .pipe(
          takeUntil(this.unsubscribe$),
          catchError((error) => {
            console.error(error);
            this.alertService.alertModal(
              'danger',
              'Tente novamente mais tarde.'
            );
            this.error$.next(true);
            return EMPTY;
          })
        )
        .subscribe(
          (response) => {
            this.deleteSuccess = `${response.status}`;
            this.alertService.alertModal('success', this.deleteSuccess);
            setTimeout(() => {
              this.router.navigate(['/']);
            }, 2000);
          },
          (error) => {
            (this.deleteError = 'Erro ao deletar livro: '), error;
            this.alertService.alertModal('danger', this.deleteError);
            console.log(this.deleteError);
          }
        );
    }
  }

  booksRelations() {
    this.router.navigate(['/livros/relatorio']);
  }
}
