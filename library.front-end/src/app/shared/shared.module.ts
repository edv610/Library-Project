import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DropboxService } from './services/dropbox.service';
import { LoginVerifiedService } from './services/login-verified.service';
import { AlertModalComponent } from './alert-modal/alert-modal.component';
import { AlertModule } from 'ngx-bootstrap/alert';

@NgModule({
  declarations: [AlertModalComponent],
  imports: [CommonModule, HttpClientModule, AlertModule.forRoot()],
  providers: [DropboxService, LoginVerifiedService],
  exports: [AlertModalComponent],
})
export class SharedModule {}
