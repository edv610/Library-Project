import { Component, OnDestroy, OnInit } from '@angular/core';

import { LoginVerifiedService } from './shared/services/login-verified.service';
import { Router } from '@angular/router';
import { AlertModalService } from './shared/alert-modal/alert-modal.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(
    public loginVerifiedService: LoginVerifiedService,
    private router: Router,
    private alertModal: AlertModalService
  ) {}
  ngOnInit(): void {}
  ngOnDestroy(): void {}

  logOff() {
    let logoffConfirm = confirm('Deseja sair da sessão?');

    if (logoffConfirm) {
      this.alertModal.alertModal('info', 'Você saiu da sessão!');

      this.loginVerifiedService.toggleVerifiedUser();
      this.router.navigate(['/login']);
    }
  }
}
