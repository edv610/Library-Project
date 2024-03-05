import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AuthorsCreateComponent } from './authors-create/authors-create.component';
import { AuthorsCreateService } from './services/authors-create.service';
import { AuthorsReadComponent } from './authors-read/authors-read.component';
import { AuthorsReadService } from './services/authors-read.service';
import { AuthorsDetailsComponent } from './authors-read/authors-details/authors-details.component';
import { AuthorsComponent } from './authors.component';
import { AuthorsRoutingModule } from './authors-routing.module';
import { AuthorsUpdateComponent } from './authors-update/authors-update.component';
import { AuthorsUpdateService } from './services/authors-update.service';

@NgModule({
  declarations: [
    AuthorsCreateComponent,
    AuthorsReadComponent,
    AuthorsDetailsComponent,
    AuthorsComponent,
    AuthorsUpdateComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    AuthorsRoutingModule,
  ],
  providers: [AuthorsCreateService, AuthorsReadService, AuthorsUpdateService],
})
export class AuthorsModule {}
