import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthorsReadService } from '../../services/authors-read.service';

@Component({
  selector: 'authors-details',
  templateUrl: './authors-details.component.html',
  styleUrls: ['./authors-details.component.scss'],
})
export class AuthorsDetailsComponent implements OnInit, OnDestroy {
  authorSubscribe: Subscription = new Subscription();
  authorId!: number;
  authorDetails: any;

  constructor(
    private router: Router,
    private routeData: ActivatedRoute,
    private authorsReadService: AuthorsReadService
  ) {}

  ngOnInit(): void {
    this.authorSubscribe = this.routeData.params?.subscribe((params) => {
      this.authorId = +params['id'];
      this.loadAuthorDetails();
    });
  }

  ngOnDestroy(): void {
    this.authorSubscribe.unsubscribe();
  }

  loadAuthorDetails() {
    this.authorsReadService
      .getAuthorDetails(this.authorId)
      ?.subscribe((details) => {
        this.authorDetails = details;
      });
  }

  authorEdit() {
    this.router.navigate(['/autores/listar/editar/', this.authorId]);
  }

  onDelete() {
    let confirmation = confirm('Deseja deletar o Usuário?');

    if (confirmation) {
      this.authorsReadService.deleteAuthor(this.authorId)?.subscribe(
        (response) => {
          alert(`${response.status}`);
          setTimeout(() => {
            this.router.navigate(['/autores']);
          }, 500);
        },
        (error) => {
          console.log('Erro ao deletar autor: ', error);
        }
      );
    }
  }
}
