import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject, catchError, takeUntil, EMPTY } from 'rxjs';

import { BooksService } from '../services/books.service';
import { AlertModalService } from 'src/app/shared/alert-modal/alert-modal.service';

@Component({
  selector: 'app-books-create',
  templateUrl: './books-create.component.html',
  styleUrls: ['./books-create.component.scss'],
})
export class BooksCreateComponent implements OnInit {
  form!: FormGroup;
  errorMessage!: string;
  authors: any[] = [];
  publishers: any[] = [];

  successMessage!: string;
  modalRef!: BsModalRef;
  error$ = new Subject<boolean>();
  private readonly unsubscribe$ = new Subject<void>();

  @Output() formSubmitted: EventEmitter<void> = new EventEmitter<void>(); //Fechar modal apos envio
  @Output() cancelClicked: EventEmitter<void> = new EventEmitter<void>(); // cancelar modal

  constructor(
    private formBuilder: FormBuilder,
    private bookService: BooksService,
    private alertService: AlertModalService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      title: [null, [Validators.required, Validators.minLength(3)]],
      publiYear: [null, Validators.required],
      authorId: [null, Validators.required],
      publisherId: [null, Validators.required],
    });

    this.loadAuthors();
    this.loadPublishers();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  loadAuthors() {
    this.bookService
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

  loadPublishers() {
    this.bookService
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

  onSubmit() {
    let confirmation;
    confirmation = confirm('Deseja Confirmar?');

    if (confirmation) {
      if (this.form.valid) {
        this.bookService
          .createBook(this.form.value)
          .pipe(takeUntil(this.unsubscribe$))
          .subscribe(
            (response) => {
              this.successMessage = `${response.Status}`;
              this.alertService.alertModal('success', this.successMessage);
              this.formSubmitted.emit();
              setTimeout(() => {
                window.location.reload();
              }, 2000);
            },
            (error) => {
              console.log('Erro ao criar livro: ', error);
              this.errorMessage = error.error.message;
              this.alertService.alertModal('danger', this.errorMessage);
            }
          );
      }
    }
  }

  cancelSubmit() {
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
