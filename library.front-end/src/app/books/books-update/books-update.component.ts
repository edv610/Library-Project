import { Component, Input, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { EMPTY, Subject, catchError, takeUntil } from 'rxjs';

import { BooksService } from '../services/books.service';
import { AlertModalService } from 'src/app/shared/alert-modal/alert-modal.service';

@Component({
  selector: 'app-books-update',
  templateUrl: './books-update.component.html',
  styleUrls: ['./books-update.component.scss'],
})
export class BooksUpdateComponent {
  form!: FormGroup;
  @Input() booksId!: number;
  bookDetails: any;
  authors: any[] = [];
  publishers: any[] = [];
  errorMessage!: string;

  successMessage!: string;
  modalRef!: BsModalRef;
  error$ = new Subject<boolean>();
  private readonly unsubscribe$ = new Subject<void>();

  @Output() formSubmitted: EventEmitter<void> = new EventEmitter<void>(); //Fechar modal apos envio
  @Output() cancelClicked: EventEmitter<void> = new EventEmitter<void>(); // cancelar modal

  constructor(
    private formBuilder: FormBuilder,
    private routeData: ActivatedRoute,
    private booksService: BooksService,
    private alertService: AlertModalService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      title: [null, [Validators.required, Validators.minLength(3)]],
      publiYear: [null, Validators.required],
      authorId: [null, Validators.required],
      publisherId: [null, Validators.required],
    });

    this.routeData.params
      .pipe(
        takeUntil(this.unsubscribe$),
        catchError((error) => {
          console.log(error);
          this.alertService.alertModal('danger', 'Tente novamente mais tarde.');
          this.error$.next(true);
          return EMPTY;
        })
      )
      .subscribe(() => {
        this.loadBookDetails();
      });

    this.loadAuthors();
    this.loadPublishers();
  }

  loadAuthors() {
    this.booksService
      .getAuthors()
      .pipe(
        takeUntil(this.unsubscribe$),
        catchError((error) => {
          console.log(error);
          this.alertService.alertModal('danger', 'Tente novamente mais tarde.');
          this.error$.next(true);
          return EMPTY;
        })
      )
      .subscribe(
        (data) => {
          this.authors = data;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  loadPublishers() {
    this.booksService
      .getPublishers()
      .pipe(
        takeUntil(this.unsubscribe$),
        catchError((error) => {
          console.log(error);
          this.alertService.alertModal('danger', 'Tente novamente mais tarde.');
          this.error$.next(true);
          return EMPTY;
        })
      )
      .subscribe(
        (data) => {
          this.publishers = data;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  loadBookDetails() {
    this.booksService
      .getBookById(this.booksId)
      .pipe(
        takeUntil(this.unsubscribe$),
        catchError((error) => {
          console.log(error);
          this.alertService.alertModal('danger', 'Tente novamente mais tarde.');
          this.error$.next(true);
          return EMPTY;
        })
      )
      .subscribe((details) => {
        this.bookDetails = details;
      });
  }

  onSubmit() {
    let confirmation = false;
    confirmation = confirm('Deseja confirmar?');
    if (confirmation) {
      if (this.form.valid) {
        this.booksService
          .updateBook(this.booksId, this.form.value)
          .pipe(takeUntil(this.unsubscribe$))
          .subscribe(
            (response) => {
              this.successMessage = `Atualizado com sucesso: ${response.message}`;
              this.alertService.alertModal('success', this.successMessage);
              this.formSubmitted.emit();
              setTimeout(() => {
                window.location.reload();
              }, 2000);
            },
            (error) => {
              console.log('Erro ao editar autor: ', error);
              this.errorMessage = error.error.message;
              this.alertService.alertModal('danger', this.errorMessage);
            }
          );
      }
    }
  }

  cancelUpdate() {
    let result = confirm('Deseja Cancelar?');
    if (result) {
      this.cancelClicked.emit();
    }
  }

  touchedValidVerify(data: string) {
    const formData = this.form.get(data);

    return formData ? formData.invalid && formData.touched : false;
  }

  showInputCssError(data: string) {
    return {
      'is-invalid': this.touchedValidVerify(data),
    };
  }
}
