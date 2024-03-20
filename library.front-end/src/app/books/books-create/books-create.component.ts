import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { BooksService } from '../services/books.service';

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

  @Output() formSubmitted: EventEmitter<void> = new EventEmitter<void>(); //Fechar modal apos envio
  @Output() cancelClicked: EventEmitter<void> = new EventEmitter<void>(); // cancelar modal

  constructor(
    private formBuilder: FormBuilder,
    private bookService: BooksService,
    private router: Router
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

  loadAuthors() {
    this.bookService.getAuthors()?.subscribe(
      (data) => {
        this.authors = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  loadPublishers() {
    this.bookService.getPublishers()?.subscribe(
      (data) => {
        this.publishers = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onSubmit() {
    if (this.form.valid) {
      this.bookService.createBook(this.form.value)?.subscribe(
        (response) => {
          alert(`
          ${response.Status}`);
          this.formSubmitted.emit();
          setTimeout(() => {
            this.router.navigate(['/livros/listar']);
          }, 500);
        },
        (error) => {
          console.log('Erro ao adicionar livro: ', error);
          this.errorMessage = error.error.message;
        }
      );
    }
  }

  cancelSubmit() {
    // this.router.navigate(['/livros']);
    this.cancelClicked.emit();
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
