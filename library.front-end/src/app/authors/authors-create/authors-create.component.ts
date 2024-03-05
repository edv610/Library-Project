import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthorsCreateService } from './../services/authors-create.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authors-create',
  templateUrl: './authors-create.component.html',
  styleUrls: ['./authors-create.component.scss'],
})
export class AuthorsCreateComponent implements OnInit {
  form!: FormGroup;
  errorMessage!: string;

  constructor(
    private formBuilder: FormBuilder,
    private authorsCreateService: AuthorsCreateService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(3)]],
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.authorsCreateService.createAuthor(this.form.value)?.subscribe(
        (response) => {
          alert(`Criado com sucesso: ${response.message}`);
          setTimeout(() => {
            this.router.navigate(['/autores/listar']); //ALTERAR PARA A PAGINA DE LISTA DE USUARIOS
          }, 500);
        },
        (error) => {
          console.log('Erro ao criar autor: ', error);
          this.errorMessage = error.error.message;
        }
      );
    }
  }

  cancelSubmit() {
    this.router.navigate(['/autores']);
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
