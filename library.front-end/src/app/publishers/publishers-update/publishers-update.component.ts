import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { EMPTY, Observable, Subject, catchError, takeUntil } from 'rxjs';

import { PublishersService } from '../services/publishers.service';
import { BrazilianStates } from 'src/app/shared/models/brazilianStates';
import { DropboxService } from 'src/app/shared/services/dropbox.service';
import { AlertModalService } from 'src/app/shared/alert-modal/alert-modal.service';

@Component({
  selector: 'app-publishers-update',
  templateUrl: './publishers-update.component.html',
  styleUrls: ['./publishers-update.component.scss'],
})
export class PublishersUpdateComponent {
  form!: FormGroup;
  @Input() publisherId!: number;
  errorMessage!: string;
  publisherDetails: any;
  states$!: Observable<BrazilianStates[]>;

  successMessage!: string;
  modalRef!: BsModalRef;
  error$ = new Subject<boolean>();
  private readonly unsubscribe$ = new Subject<void>();

  @Output() formSubmitted: EventEmitter<void> = new EventEmitter<void>(); //Fechar modal apos envio
  @Output() cancelClicked: EventEmitter<void> = new EventEmitter<void>(); // cancelar modal

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private routeData: ActivatedRoute,
    private publisherService: PublishersService,
    private dropdownService: DropboxService,
    private alertService: AlertModalService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(3)]],
      location: [null, [Validators.required, Validators.maxLength(2)]],
    });

    this.routeData.params?.subscribe(() => {
      this.loadPublisherDetails();
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

  loadPublisherDetails() {
    this.publisherService
      .getPublisherDetails(this.publisherId)
      .pipe(
        takeUntil(this.unsubscribe$),
        catchError((error) => {
          console.error(error);
          this.alertService.alertModal('danger', 'Tente novamente mais tarde.');
          this.error$.next(true);
          return EMPTY;
        })
      )
      .subscribe((details) => {
        this.publisherDetails = details;
      });
  }

  onSubmit() {
    let confirmation = false;
    confirmation = confirm('Deseja confirmar?');
    if (confirmation) {
      if (this.form.valid) {
        this.publisherService
          .updatePublisher(this.publisherId, this.form.value)
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
