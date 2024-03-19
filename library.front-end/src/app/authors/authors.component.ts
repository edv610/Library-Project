import { Component, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.scss'],
})
export class AuthorsComponent {
  modalRef?: BsModalRef;
  constructor(private router: Router, private modalService: BsModalService) {}

  // newAuthor() {
  //   this.router.navigate(['/autores/cadastro']);
  // }

  listAuthor() {
    this.router.navigate(['/autores/listar']);
  }

  newAuthor(template: TemplateRef<void>) {
    this.modalRef = this.modalService.show(template);
  }
}
