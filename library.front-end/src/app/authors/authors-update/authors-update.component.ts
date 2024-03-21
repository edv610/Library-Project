import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthorsReadService } from './../services/authors-read.service';
import { AuthorsUpdateService } from './../services/authors-update.service';

@Component({
  selector: 'app-update',
  templateUrl: './authors-update.component.html',
  styleUrls: ['./authors-update.component.scss'],
})
export class AuthorsUpdateComponent implements OnInit {
  form!: FormGroup;
  @Input() authorId!: number;
  errorMessage!: string;
  authorDetails: any;
  authorSubscribe: Subscription = new Subscription();

  @Output() formSubmitted: EventEmitter<void> = new EventEmitter<void>(); //Fechar modal apos envio
  @Output() cancelClicked: EventEmitter<void> = new EventEmitter<void>(); // cancelar modal

  constructor(
    private authorsUpdateService: AuthorsUpdateService,
    private formBuilder: FormBuilder,
    private router: Router,
    private routeData: ActivatedRoute,
    private authorsReadService: AuthorsReadService
  ) {
    this.authorId = this.routeData.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(3)]],
    });

    this.authorSubscribe = this.routeData.params?.subscribe(() => {
      this.loadAuthorDetails();
    });
  }

  loadAuthorDetails() {
    this.authorsReadService
      .getAuthorDetails(this.authorId)
      ?.subscribe((details) => {
        this.authorDetails = details;
      });
  }

  ngOnDestroy(): void {
    this.authorSubscribe.unsubscribe();
  }

  onSubmit() {
    let confirmation = false;
    confirmation = confirm('Deseja confirmar?');

    if (confirmation) {
      if (this.form.valid) {
        this.authorsUpdateService
          .updateAuthor(this.form.value, this.authorId)
          ?.subscribe(
            (response) => {
              alert(`Atualizado com sucesso: ${response.message}`);
              this.formSubmitted.emit();
              setTimeout(() => {
                this.router.navigate(['/']);
              }, 500);
            },
            (error) => {
              console.log('Erro ao editar autor: ', error);
              this.errorMessage = error.error.message;
            }
          );
      }
    }
  }

  cancelUpdate() {
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
