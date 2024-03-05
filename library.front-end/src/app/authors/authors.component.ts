import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.scss'],
})
export class AuthorsComponent {
  constructor(private router: Router) {}

  newAuthor() {
    this.router.navigate(['/autores/cadastro']);
  }

  listAuthor() {
    this.router.navigate(['/autores/listar']);
  }
}
