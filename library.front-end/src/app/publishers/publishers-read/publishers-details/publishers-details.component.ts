import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { PublishersService } from '../../services/publishers.service';

@Component({
  selector: 'app-publishers-details',
  templateUrl: './publishers-details.component.html',
  styleUrls: ['./publishers-details.component.scss'],
})
export class PublishersDetailsComponent {
  publisherSubscribe: Subscription = new Subscription();
  publisherId!: number;
  publisherDetails: any;

  constructor(
    private router: Router,
    private routeData: ActivatedRoute,
    private publisherService: PublishersService
  ) {}

  ngOnInit(): void {
    this.publisherDetails = this.routeData.params?.subscribe((params) => {
      this.publisherId = +params['id'];
      this.loadPublisherDetails();
    });
  }

  ngOnDestroy(): void {
    this.publisherSubscribe.unsubscribe();
  }

  loadPublisherDetails() {
    this.publisherService
      .getPublisherDetails(this.publisherId)
      ?.subscribe((details) => {
        this.publisherDetails = details;
      });
  }

  publisherEdit() {
    this.router.navigate(['/editoras/listar/editar/', this.publisherId]);
  }

  onDelete() {
    let confirmation = confirm('Deseja deletar o Editora?');

    if (confirmation) {
      this.publisherService.deletePublisher(this.publisherId)?.subscribe(
        (response) => {
          alert('Editora deletada com sucesso!');
          setTimeout(() => {
            window.location.href = '/editoras/listar';
          }, 500);
        },
        (error) => {
          console.log('Erro ao deletar editora: ', error);
        }
      );
    }
  }
}
