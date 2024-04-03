import { Component, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { EMPTY, Observable, Subject, takeUntil, catchError } from 'rxjs';

import { AuthorsService } from '../services/authors.service';
import { Authors } from '../authors-interface';
import { AlertModalComponent } from 'src/app/shared/alert-modal/alert-modal.component';

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
    private router: Router,
    private modalService: BsModalService
  ) {}

  ngOnInit() {
    this.error$.next(false);
  }

  loadData() {
    this.loadKey = true;
    setTimeout(() => {
      this.authors$ = this.authorsService.getAuthors().pipe(
        catchError((error) => {
          console.error(error);
          this.alertModal('danger', 'Tente novamente mais tarde.');
          this.error$.next(true);
          return EMPTY;
        })
      );
    }, 2000);
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
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(
          (response) => {
            this.deleteSuccess = `${response.status}`;
            this.alertModal('success', this.deleteSuccess);
            setTimeout(() => {
              this.router.navigate(['/']);
            }, 2000);
          },
          (error) => {
            (this.deleteError = 'Erro ao deletar autor: '), error;
            this.alertModal('danger', this.deleteError);
            console.log(this.deleteError);
          }
        );
    }
  }

  alertModal(type: string, message: any) {
    this.modalRef = this.modalService.show(AlertModalComponent);
    this.modalRef.content.type = type;
    this.modalRef.content.message = message;
  }
}
