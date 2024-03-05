import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { BooksComponent } from './books.component';
import { BooksRoutingModule } from './books-routing.module';
import { BooksService } from './services/books.service';
import { BooksCreateComponent } from './books-create/books-create.component';
import { BooksReadComponent } from './books-read/books-read.component';
import { BooksDetailsComponent } from './books-read/books-details/books-details.component';
import { BooksUpdateComponent } from './books-update/books-update.component';
import { BooksRelationsComponent } from './books-relations/books-relations.component';

@NgModule({
  declarations: [BooksComponent, BooksCreateComponent, BooksReadComponent, BooksDetailsComponent, BooksUpdateComponent, BooksRelationsComponent],
  imports: [
    CommonModule,
    BooksRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  providers: [BooksService],
})
export class BooksModule {}
