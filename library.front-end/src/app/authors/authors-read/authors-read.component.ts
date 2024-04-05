import { Component, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { EMPTY, Observable, Subject, takeUntil, catchError } from 'rxjs';

import { AuthorsService } from '../services/authors.service';
import { Authors } from '../authors-interface';
import { AlertModalService } from 'src/app/shared/alert-modal/alert-modal.service';

@Component({
  selector: 'app-authors-read',
  templateUrl: './authors-read.component.html',
  styleUrls: ['./authors-read.component.scss'],
})
export class AuthorsReadComponent {
  authors$!: Observable<Authors[]>;
  authorId!: number;
  loadKey: boolean = false;
  error$ = new Subject<boolean>();
  deleteSuccess: any;
  deleteError: any;
  modalRef!: BsModalRef;
  private readonly unsubscribe$ = new Subject<void>();

  constructor(
    private authorsService: AuthorsService,
    private modalService: BsModalService,
    private alertService: AlertModalService
  ) {}

  ngOnInit() {
    this.error$.next(false);
    this.loadData();
  }

  loadData() {
    this.loadKey = true;
    this.authors$ = this.authorsService.getAuthors().pipe(
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

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  newAuthor(template: TemplateRef<void>) {
    this.modalRef = this.modalService.show(template);
  }

  onDelete() {
    let confirmation = confirm('Deseja deletar o Autor?');
    if (confirmation) {
      this.authorsService
        .deleteAuthor(this.authorId)
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
            this.deleteSuccess = `${response.status}`;
            this.alertService.alertModal('success', this.deleteSuccess);
            this.loadData();
          },
          (error) => {
            (this.deleteError = 'Erro ao deletar autor: '), error;
            this.alertService.alertModal('danger', this.deleteError);
            console.log(this.deleteError);
          }
        );
    }
  }
}
