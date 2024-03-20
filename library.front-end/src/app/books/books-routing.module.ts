import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BooksReadComponent } from './books-read/books-read.component';
import { BooksRelationsComponent } from './books-relations/books-relations.component';
import { AuthGuard } from '../guards/auth-guard';

const booksRoutes: Routes = [
  {
    path: 'livros/relatorio',
    component: BooksRelationsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'livros',
    component: BooksReadComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(booksRoutes)],
  exports: [RouterModule],
})
export class BooksRoutingModule {}
