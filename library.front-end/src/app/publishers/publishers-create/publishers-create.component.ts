import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { EMPTY, Observable, Subject, catchError, takeUntil } from 'rxjs';
import { Router } from '@angular/router';

import { PublishersService } from '../services/publishers.service';
import { DropboxService } from 'src/app/shared/services/dropbox.service';
import { BrazilianStates } from 'src/app/shared/models/brazilianStates';
import { AlertModalService } from 'src/app/shared/alert-modal/alert-modal.service';

@Component({
  selector: 'app-publishers-create',
  templateUrl: './publishers-create.component.html',
  styleUrls: ['./publishers-create.component.scss'],
})
export class PublishersCreateComponent {
  form!: FormGroup;
  errorMessage!: string;
  states$!: Observable<BrazilianStates[]>;
  successMessage!: string;
  modalRef!: BsModalRef;
  error$ = new Subject<boolean>();
  private readonly unsubscribe$ = new Subject<void>();

  @Output() formSubmitted: EventEmitter<void> = new EventEmitter<void>(); //Fechar modal apos envio
  @Output() cancelClicked: EventEmitter<void> = new EventEmitter<void>(); // cancelar modal

  constructor(
    private formBuilder: FormBuilder,
    private publisherService: PublishersService,
    private router: Router,
    private dropdownService: DropboxService,
    private alertService: AlertModalService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(3)]],
      location: [null, [Validators.required, Validators.maxLength(2)]],
    });

    this.states$ = this.dropdownService.getBrazilianStates().pipe(
      takeUntil(this.unsubscribe$),
      catchError((error) => {
        console.error(error);
        this.alertService.alertModal('danger', 'Tente novamente mais tarde.');
        this.error$.next(true);
        return EMPTY;
      })
    );
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
        this.publisherService
          .createPublisher(this.form.value)
          .pipe(takeUntil(this.unsubscribe$))
          .subscribe(
            (response) => {
              this.successMessage = `${response.status} \n Nome: ${response.message} \n Estado: ${response.message2}`;
              this.alertService.alertModal('success', this.successMessage);
              this.formSubmitted.emit();
              setTimeout(() => {
                window.location.reload();
              }, 2000);
            },
            (error) => {
              console.log('Erro ao criar autor: ', error);
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
