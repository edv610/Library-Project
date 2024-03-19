import {
  Component,
  OnInit,
  TemplateRef,
  Output,
  EventEmitter,
} from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';

import { AuthorsReadService } from '../services/authors-read.service';

@Component({
  selector: 'app-authors-read',
  templateUrl: './authors-read.component.html',
  styleUrls: ['./authors-read.component.scss'],
})
export class AuthorsReadComponent implements OnInit {
  authors: any[] = [];
  modalRef?: BsModalRef;

  authorId!: number;

  @Output() formSubmitted: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private authorsReadService: AuthorsReadService,
    private router: Router,
    private modalService: BsModalService
  ) {
    this.loadData();
  }

  loadData() {
    this.authorsReadService.getAuthors()?.subscribe((response) => {
      this.authors = response;
    });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  ngOnInit(): void {}

  newAuthor(template: TemplateRef<void>) {
    this.modalRef = this.modalService.show(template);
  }

  onDelete() {
    let confirmation = confirm('Deseja deletar o Usuário?');
    if (confirmation) {
      this.authorsReadService.deleteAuthor(this.authorId)?.subscribe(
        (response) => {
          alert(`${response.status}`);
          this.formSubmitted.emit();
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 500);
        },
        (error) => {
          console.log('Erro ao deletar autor: ', error);
        }
      );
    }
  }
}
