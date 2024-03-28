import { Component, OnInit, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-alert-modal',
  templateUrl: './alert-modal.component.html',
  styleUrls: ['./alert-modal.component.scss'],
})
export class AlertModalComponent {
  @Input() type!: string;
  @Input() message!: string;
  alertTimeout: number = 5000;

  constructor(public modalRef: BsModalRef) {}
  isVisible: boolean = true;

  ngOnInit(): void {
    if (this.alertTimeout > 0) {
      setTimeout(() => {
        this.isVisible = false;
      }, this.alertTimeout);
    }
  }
}
