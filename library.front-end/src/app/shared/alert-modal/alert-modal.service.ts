import { Injectable } from '@angular/core';

import { AlertModalComponent } from './alert-modal.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Injectable({
  providedIn: 'root',
})
export class AlertModalService {
  modalRef!: BsModalRef;
  constructor(private modalService: BsModalService) {}

  alertModal(type: string, message: any) {
    this.modalRef = this.modalService.show(AlertModalComponent);
    this.modalRef.content.type = type;
    this.modalRef.content.message = message;
  }
}
