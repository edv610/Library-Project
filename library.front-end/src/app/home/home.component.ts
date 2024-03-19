import { Component, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  modalRef?: BsModalRef;
  constructor(private modalService: BsModalService) {}

  openModal(template: TemplateRef<void>) {
    this.modalRef = this.modalService.show(template);
  }
}
