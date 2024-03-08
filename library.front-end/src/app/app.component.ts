import { Component, OnDestroy, OnInit } from '@angular/core';

import { LoginVerifiedService } from './shared/services/login-verified.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(
    public loginVerifiedService: LoginVerifiedService,
    private router: Router
  ) {}
  ngOnInit(): void {}
  ngOnDestroy(): void {}

  logOff() {
    alert('Você saiu da sessão!');
    setTimeout(() => {
      this.loginVerifiedService.toggleVerifiedUser();
      this.router.navigate(['/login']);
    }, 500);
  }
}
