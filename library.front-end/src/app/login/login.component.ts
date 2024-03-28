import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

import { LoginAuthService } from './services/auth.service';
import { LoginVerifiedService } from '../shared/services/login-verified.service';
import { AlertModalComponent } from 'src/app/shared/alert-modal/alert-modal.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  errorMessage!: string;

  modalRef!: BsModalRef;
  constructor(
    private login: LoginAuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private loginVerified: LoginVerifiedService,
    private modalService: BsModalService
  ) {
    this.form = this.formBuilder.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required, Validators.minLength(8)]],
    });
  }
  ngOnInit(): void {}

  onSubmit() {
    if (this.form.valid) {
      this.login.authUser(this.form.value)?.subscribe(
        (response) => {
          this.loginVerified.toggleVerifiedUser();
          this.alertModal('success', `${response.status}`);
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 500);
        },
        (error) => {
          console.log(error);
          this.errorMessage = error.error.message;
          this.alertModal('danger', this.errorMessage);
        }
      );
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

  alertModal(type: string, message: any) {
    this.modalRef = this.modalService.show(AlertModalComponent);
    this.modalRef.content.type = type;
    this.modalRef.content.type = type;
    this.modalRef.content.message = message;
  }
}
