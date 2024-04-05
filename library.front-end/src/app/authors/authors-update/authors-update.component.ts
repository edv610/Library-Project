import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { EMPTY, Subject, catchError, takeUntil } from 'rxjs';

import { AuthorsService } from '../services/authors.service';
import { AlertModalService } from 'src/app/shared/alert-modal/alert-modal.service';

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

  successMessage!: string;
  modalRef!: BsModalRef;
  error$ = new Subject<boolean>();
  private readonly unsubscribe$ = new Subject<void>();

  @Output() formSubmitted: EventEmitter<void> = new EventEmitter<void>(); //Fechar modal apos envio
  @Output() cancelClicked: EventEmitter<void> = new EventEmitter<void>(); // cancelar modal

  constructor(
    private formBuilder: FormBuilder,
    private routeData: ActivatedRoute,
    private authorsReadService: AuthorsService,
    private alertService: AlertModalService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(3)]],
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
        this.loadAuthorDetails();
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  loadAuthorDetails() {
    this.authorsReadService
      .getAuthorDetails(this.authorId)
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
        this.authorDetails = details;
      });
  }

  onSubmit() {
    let confirmation = false;
    confirmation = confirm('Deseja confirmar?');
    if (confirmation) {
      if (this.form.valid) {
        this.authorsReadService
          .updateAuthor(this.form.value, this.authorId)
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
