import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, takeUntil } from 'rxjs/operators';

import { LoginAuthService } from './services/auth.service';
import { LoginVerifiedService } from '../shared/services/login-verified.service';
import { AlertModalService } from '../shared/alert-modal/alert-modal.service';
import { EMPTY, Subject } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  errorMessage!: string;
  successMessage!: string;
  error$ = new Subject<boolean>();
  private readonly unsubscribe$ = new Subject<void>();

  constructor(
    private login: LoginAuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private loginVerified: LoginVerifiedService,
    private alertModalService: AlertModalService
  ) {
    this.form = this.formBuilder.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required, Validators.minLength(8)]],
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.form.valid) {
      this.login
        .authUser(this.form.value)
        .pipe(
          takeUntil(this.unsubscribe$),
          catchError((error) => {
            console.log(error);
            this.alertModalService.alertModal(
              'danger',
              'Tente novamente mais tarde.'
            );
            this.error$.next(true);
            return EMPTY;
          })
        )
        .subscribe(
          (response) => {
            this.loginVerified.toggleVerifiedUser();
            this.alertModalService.alertModal('success', `${response.status}`);
            this.router.navigate(['/']);
          },
          (error) => {
            console.log(error);
            this.errorMessage = error.error.message;
            this.alertModalService.alertModal('danger', this.errorMessage);
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

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
