import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AuthorsCreateComponent } from './authors-create/authors-create.component';
import { AuthorsReadComponent } from './authors-read/authors-read.component';
import { AuthorsService } from './services/authors.service';
import { AuthorsRoutingModule } from './authors-routing.module';
import { AuthorsUpdateComponent } from './authors-update/authors-update.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    AuthorsCreateComponent,
    AuthorsReadComponent,

    AuthorsUpdateComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    AuthorsRoutingModule,
    SharedModule,
  ],
  providers: [AuthorsService],
})
export class AuthorsModule {}
