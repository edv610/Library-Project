import { Component, OnDestroy, OnInit } from '@angular/core';

import { LoginVerifiedService } from './shared/services/login-verified.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(public loginVerifiedService: LoginVerifiedService) {}
  ngOnInit(): void {}
  ngOnDestroy(): void {}
}
