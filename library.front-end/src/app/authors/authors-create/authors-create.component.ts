import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subject, catchError, takeUntil, EMPTY } from 'rxjs';

import { AuthorsService } from './../services/authors.service';
import { Router } from '@angular/router';
import { AlertModalComponent } from 'src/app/shared/alert-modal/alert-modal.component';

@Component({
  selector: 'app-authors-create',
  templateUrl: './authors-create.component.html',
  styleUrls: ['./authors-create.component.scss'],
})
export class AuthorsCreateComponent implements OnInit {
  form!: FormGroup;
  errorMessage!: string;
  successMessage!: string;
  modalRef!: BsModalRef;
  error$ = new Subject<boolean>();
  private readonly unsubscribe$ = new Subject<void>();

  @Output() formSubmitted: EventEmitter<void> = new EventEmitter<void>(); //Fechar modal apos envio
  @Output() cancelClicked: EventEmitter<void> = new EventEmitter<void>(); // cancelar modal

  constructor(
    private formBuilder: FormBuilder,
    private authorsCreateService: AuthorsService,
    private router: Router,
    private modalService: BsModalService
  ) {}
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(3)]],
    });
  }
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onSubmit() {
    let confirmation;
    confirmation = confirm('Deseja Confirmar?');

    if (confirmation) {
      if (this.form.valid) {
        this.authorsCreateService
          .createAuthor(this.form.value)
          .pipe(
            takeUntil(this.unsubscribe$),
            catchError((error) => {
              console.log(error);
              this.alertModal('danger', 'Tente novamente mais tarde.');
              this.error$.next(true);
              return EMPTY;
            })
          )
          .subscribe(
            (response) => {
              this.successMessage = `Criado com sucesso: ${response.message}`;
              this.alertModal('success', this.successMessage);
              this.formSubmitted.emit();
              setTimeout(() => {
                this.router.navigate(['/']);
              }, 2000);
            },
            (error) => {
              console.log('Erro ao criar autor: ', error);
              this.errorMessage = error.error.message;
              this.alertModal('danger', this.errorMessage);
            }
          );
      }
    }
  }

  cancelSubmit() {
    this.cancelClicked.emit();
  }

  touchedValidVerify(data: string) {
    const formData = this.form.get(data);
    return formData ? formData.invalid && formData.touched : false;
  }

  alertModal(type: string, message: any) {
    this.modalRef = this.modalService.show(AlertModalComponent);
    this.modalRef.content.type = type;
    this.modalRef.content.message = message;
  }

  showInputCssError(data: string) {
    return {
      'is-invalid': this.touchedValidVerify(data),
    };
  }
}
