import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BooksComponent } from './books.component';
import { BooksCreateComponent } from './books-create/books-create.component';
import { BooksReadComponent } from './books-read/books-read.component';
import { BooksDetailsComponent } from './books-read/books-details/books-details.component';
import { BooksUpdateComponent } from './books-update/books-update.component';
import { BooksRelationsComponent } from './books-relations/books-relations.component';

const booksRoutes: Routes = [
  { path: 'livros', component: BooksComponent },
  { path: 'livros/cadastro', component: BooksCreateComponent },
  { path: 'livros/relacao', component: BooksRelationsComponent },
  {
    path: 'livros/listar',
    component: BooksReadComponent,
    children: [
      { path: 'detalhes/:id', component: BooksDetailsComponent },
      { path: 'editar/:id', component: BooksUpdateComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(booksRoutes)],
  exports: [RouterModule],
})
export class BooksRoutingModule {}
