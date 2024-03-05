import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthorsReadService } from '../services/authors-read.service';

@Component({
  selector: 'app-authors-read',
  templateUrl: './authors-read.component.html',
  styleUrls: ['./authors-read.component.scss'],
})
export class AuthorsReadComponent implements OnInit {
  authors: any[] = [];

  constructor(
    private authorsReadService: AuthorsReadService,
    private router: Router
  ) {
    this.loadData();
  }

  loadData() {
    this.authorsReadService.getAuthors()?.subscribe((response) => {
      this.authors = response;
    });
  }

  cancelUpdate() {
    this.router.navigate(['/autores']);
  }

  ngOnInit(): void {}
}
