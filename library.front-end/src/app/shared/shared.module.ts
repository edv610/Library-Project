import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertModalComponent } from './alert-modal/alert-modal.component';
import { AlertModule } from 'ngx-bootstrap/alert';

import { DropboxService } from './services/dropbox.service';
import { LoginVerifiedService } from './services/login-verified.service';
import { AlertModalService } from './alert-modal/alert-modal.service';

@NgModule({
  declarations: [AlertModalComponent],
  imports: [CommonModule, HttpClientModule, AlertModule.forRoot()],
  providers: [DropboxService, LoginVerifiedService, AlertModalService],
  exports: [AlertModalComponent],
})
export class SharedModule {}
