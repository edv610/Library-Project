import { Component, Input, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { BooksService } from '../services/books.service';

@Component({
  selector: 'app-books-update',
  templateUrl: './books-update.component.html',
  styleUrls: ['./books-update.component.scss'],
})
export class BooksUpdateComponent {
  form!: FormGroup;
  @Input() booksId!: number;
  errorMessage!: string;
  bookDetails: any;

  authors: any[] = [];
  publishers: any[] = [];

  bookSubscribe: Subscription = new Subscription();

  @Output() formSubmitted: EventEmitter<void> = new EventEmitter<void>(); //Fechar modal apos envio
  @Output() cancelClicked: EventEmitter<void> = new EventEmitter<void>(); // cancelar modal

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private routeData: ActivatedRoute,
    private booksService: BooksService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      title: [null, [Validators.required, Validators.minLength(3)]],
      publiYear: [null, Validators.required],
      authorId: [null, Validators.required],
      publisherId: [null, Validators.required],
    });

    this.bookSubscribe = this.routeData.params?.subscribe(() => {
      this.loadBookDetails();
    });

    this.loadAuthors();
    this.loadPublishers();
  }

  loadAuthors() {
    this.booksService.getAuthors()?.subscribe(
      (data) => {
        this.authors = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  loadPublishers() {
    this.booksService.getPublishers()?.subscribe(
      (data) => {
        this.publishers = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  loadBookDetails() {
    this.booksService.getBookById(this.booksId)?.subscribe((details) => {
      this.bookDetails = details;
    });
  }

  ngOnDestroy(): void {
    this.bookSubscribe.unsubscribe();
  }

  onSubmit() {
    let result = confirm('Deseja atualizar?');
    if (result) {
      if (this.form.valid) {
        this.booksService.updateBook(this.booksId, this.form.value)?.subscribe(
          (response) => {
            alert(`Livro: ${response.message} ${response.status}`);
            this.formSubmitted.emit();
            setTimeout(() => {
              this.router.navigate(['/']);
            }, 500);
          },
          (error) => {
            console.log('Erro ao editar: ', error);
            this.errorMessage = error.error.message;
          }
        );
      }
    }
  }

  cancelUpdate() {
    let result = confirm('Deseja Cancelar?');
    if (result) {
      this.cancelClicked.emit();
      this.router.navigate(['/']);
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
