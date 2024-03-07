import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { PublishersService } from '../services/publishers.service';
import { DropboxService } from 'src/app/shared/services/dropbox.service';
import { BrazilianStates } from 'src/app/shared/models/brazilianStates';

@Component({
  selector: 'app-publishers-create',
  templateUrl: './publishers-create.component.html',
  styleUrls: ['./publishers-create.component.scss'],
})
export class PublishersCreateComponent {
  form!: FormGroup;
  errorMessage!: string;
  states!: BrazilianStates[];

  constructor(
    private formBuilder: FormBuilder,
    private publisherService: PublishersService,
    private router: Router,
    private dropdownService: DropboxService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(3)]],
      location: [null, [Validators.required, Validators.maxLength(2)]],
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

  onSubmit() {
    if (this.form.valid) {
      this.publisherService.createPublisher(this.form.value)?.subscribe(
        (response) => {
          alert(
            `${response.status} \n Nome: ${response.message} \n Estado: ${response.message2}`
          );
          setTimeout(() => {
            this.router.navigate(['/editoras/listar']);
          }, 500);
        },
        (error) => {
          console.log('Erro ao criar Editora: ', error);
          this.errorMessage = error.error.message;
        }
      );
    }
  }

  cancelSubmit() {
    this.router.navigate(['/editoras']);
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
