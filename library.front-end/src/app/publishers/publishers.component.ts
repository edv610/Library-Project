import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-publishers',
  templateUrl: './publishers.component.html',
  styleUrls: ['./publishers.component.scss'],
})
export class PublishersComponent {
  constructor(private router: Router) {}

  newPublisher() {
    this.router.navigate(['/editoras/cadastro']);
  }

  listPublishers() {
    this.router.navigate(['/editoras/listar']);
  }
}
