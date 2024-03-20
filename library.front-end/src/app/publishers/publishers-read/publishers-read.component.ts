import {
  Component,
  TemplateRef,
  Output,
  EventEmitter,
  Input,
} from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';

import { PublishersService } from '../services/publishers.service';

@Component({
  selector: 'app-publishers-read',
  templateUrl: './publishers-read.component.html',
  styleUrls: ['./publishers-read.component.scss'],
})
export class PublishersReadComponent {
  modalRef?: BsModalRef;
  publishers: any[] = [];

  @Input() publisherId!: number;
  @Output() formSubmitted: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private publisherService: PublishersService,
    private router: Router,
    private modalService: BsModalService
  ) {
    this.loadData();
  }

  loadData() {
    this.publisherService.getPublishers()?.subscribe((response) => {
      this.publishers = response;
    });
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
      this.publisherService.deletePublisher(this.publisherId)?.subscribe(
        (response) => {
          alert(`${response.Status}`);
          this.formSubmitted.emit();
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 500);
        },
        (error) => {
          console.log('Erro ao deletar editora: ', error);
          console.log(error.error.status);
        }
      );
    }
  }
}
