import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DropboxService } from './services/dropbox.service';
import { LoginVerifiedService } from './services/login-verified.service';

@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule],
  providers: [DropboxService, LoginVerifiedService],
})
export class SharedModule {}
