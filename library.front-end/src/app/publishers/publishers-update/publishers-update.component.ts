import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { PublishersService } from '../services/publishers.service';
import { BrazilianStates } from 'src/app/shared/models/brazilianStates';
import { DropboxService } from 'src/app/shared/services/dropbox.service';

@Component({
  selector: 'app-publishers-update',
  templateUrl: './publishers-update.component.html',
  styleUrls: ['./publishers-update.component.scss'],
})
export class PublishersUpdateComponent {
  form!: FormGroup;
  publisherId!: number;
  errorMessage!: string;
  publisherDetails: any;
  states!: BrazilianStates[];

  publisherSubscribe: Subscription = new Subscription();

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private routeData: ActivatedRoute,
    private publisherService: PublishersService,
    private dropdownService: DropboxService
  ) {
    this.publisherId = this.routeData.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(3)]],
      location: [null, [Validators.required, Validators.maxLength(2)]],
    });

    this.publisherSubscribe = this.routeData.params?.subscribe((params) => {
      this.publisherId = +params['id'];
      this.loadPublisherDetails();
    });

    this.dropdownService.getBrazilianStates()?.subscribe(
      (data) => {
        this.states = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  loadPublisherDetails() {
    this.publisherService
      .getPublisherDetails(this.publisherId)
      ?.subscribe((details) => {
        this.publisherDetails = details;
      });
  }

  ngOnDestroy(): void {
    this.publisherSubscribe.unsubscribe();
  }

  onSubmit() {
    let result = confirm('Deseja atualizar?');
    if (result) {
      if (this.form.valid) {
        this.publisherService
          .updatePublisher(this.publisherId, this.form.value)
          ?.subscribe(
            (response) => {
              alert(
                `Criado com sucesso! \n Nome: ${response.message} \n Estado: ${response.message2}`
              );

              window.location.href = '/editoras/listar';
            },
            (error) => {
              console.log('Erro ao editar: ', error);
              this.errorMessage = error.error.message;
            }
          );
      }
    }
  }

  cancelUpdate() {
    let result = confirm('Deseja Cancelar?');
    if (result) {
      this.router.navigate(['/editoras/listar']);
    }
  }

  touchedValidVerify(data: string) {
    const formData = this.form.get(data);

    return formData ? formData.invalid && formData.touched : false;
  }

  showInputCssError(data: string) {
    return {
      'is-invalid': this.touchedValidVerify(data),
    };
  }
}
