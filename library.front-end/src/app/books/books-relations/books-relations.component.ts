import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BooksService } from '../services/books.service';
import { EMPTY, Observable, Subject, catchError, takeUntil } from 'rxjs';
import { AlertModalService } from 'src/app/shared/alert-modal/alert-modal.service';
import { Books } from '../books-interface';

@Component({
  selector: 'app-books-relations',
  templateUrl: './books-relations.component.html',
  styleUrls: ['./books-relations.component.scss'],
})
export class BooksRelationsComponent {
  booksRelations$!: Observable<Books[]>;
  loadKey: boolean = false;
  error$ = new Subject<boolean>();
  private readonly unsubscribe$ = new Subject<void>();

  constructor(
    private booksService: BooksService,
    private router: Router,
    private alertService: AlertModalService
  ) {
    this.loadBookRelation();
  }

  loadBookRelation() {
    this.loadKey = true;

    this.booksRelations$ = this.booksService.getBookRelation().pipe(
      takeUntil(this.unsubscribe$),
      catchError((error) => {
        console.log(error);
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

  onCancel() {
    this.router.navigate(['/livros']);
  }
}
