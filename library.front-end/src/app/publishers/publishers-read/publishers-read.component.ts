import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { PublishersService } from '../services/publishers.service';

@Component({
  selector: 'app-publishers-read',
  templateUrl: './publishers-read.component.html',
  styleUrls: ['./publishers-read.component.scss'],
})
export class PublishersReadComponent {
  publishers: any[] = [];
  constructor(
    private publisherService: PublishersService,
    private router: Router
  ) {
    this.loadData();
  }

  loadData() {
    this.publisherService.getPublishers()?.subscribe((response) => {
      this.publishers = response;
    });
  }

  onCancel() {
    this.router.navigate(['/editoras']);
  }
}
