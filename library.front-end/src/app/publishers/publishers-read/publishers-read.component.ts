import {
  Component,
  TemplateRef,
  Output,
  EventEmitter,
  Input,
} from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { EMPTY, Observable, Subject, takeUntil, catchError } from 'rxjs';

import { PublishersService } from '../services/publishers.service';
import { AlertModalService } from 'src/app/shared/alert-modal/alert-modal.service';
import { Publishers } from '../publisher-interface';

@Component({
  selector: 'app-publishers-read',
  templateUrl: './publishers-read.component.html',
  styleUrls: ['./publishers-read.component.scss'],
})
export class PublishersReadComponent {
  modalRef?: BsModalRef;
  publishers$!: Observable<Publishers[]>;
  loadKey: boolean = false;
  error$ = new Subject<boolean>();
  @Input() publisherId!: number;
  deleteSuccess: any;
  deleteError: any;
  private readonly unsubscribe$ = new Subject<void>();
  @Output() formSubmitted: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private publisherService: PublishersService,
    private router: Router,
    private modalService: BsModalService,
    private alertService: AlertModalService
  ) {}

  ngOnInit() {
    this.error$.next(false);
    this.loadData();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  loadData() {
    this.loadKey = true;

    this.publishers$ = this.publisherService.getPublishers().pipe(
      takeUntil(this.unsubscribe$),
      catchError((error) => {
        console.error(error);
        this.alertService.alertModal('danger', 'Tente novamente mais tarde.');
        this.error$.next(true);
        return EMPTY;
      })
    );
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  newPublisher(template: TemplateRef<void>) {
    this.modalRef = this.modalService.show(template);
  }

  onDelete() {
    let confirmation = confirm('Deseja deletar o Editora?');
    if (confirmation) {
      this.publisherService
        .deletePublisher(this.publisherId)
        .pipe(
          takeUntil(this.unsubscribe$),
          catchError((error) => {
            console.error(error);
            this.alertService.alertModal(
              'danger',
              'Tente novamente mais tarde.'
            );
            this.error$.next(true);
            return EMPTY;
          })
        )
        .subscribe(
          (response) => {
            this.deleteSuccess = `${response.Status}`;
            this.alertService.alertModal('success', this.deleteSuccess);

            this.loadData();
          },
          (error) => {
            (this.deleteError = 'Erro ao deletar editora: '), error;
            this.alertService.alertModal('danger', this.deleteError);
            console.log(this.deleteError);
          }
        );
    }
  }
}
