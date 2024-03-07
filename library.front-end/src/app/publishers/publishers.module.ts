import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { PublishersService } from './services/publishers.service';
import { PublishersRoutingModule } from './publishers-routing.module';
import { PublishersComponent } from './publishers.component';
import { PublishersCreateComponent } from './publishers-create/publishers-create.component';
import { PublishersReadComponent } from './publishers-read/publishers-read.component';
import { PublishersDetailsComponent } from './publishers-read/publishers-details/publishers-details.component';
import { PublishersUpdateComponent } from './publishers-update/publishers-update.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    PublishersComponent,
    PublishersCreateComponent,
    PublishersReadComponent,
    PublishersDetailsComponent,
    PublishersUpdateComponent,
  ],
  imports: [
    CommonModule,
    PublishersRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule,
  ],
  providers: [PublishersService],
})
export class PublishersModule {}
