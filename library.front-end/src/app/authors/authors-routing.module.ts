import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthorsComponent } from './authors.component';
import { AuthorsCreateComponent } from './authors-create/authors-create.component';
import { AuthorsReadComponent } from './authors-read/authors-read.component';
import { AuthorsDetailsComponent } from './authors-read/authors-details/authors-details.component';
import { AuthorsUpdateComponent } from './authors-update/authors-update.component';

const authorsRoutes: Routes = [
  { path: 'autores', component: AuthorsComponent },
  { path: 'autores/cadastro', component: AuthorsCreateComponent },
  {
    path: 'autores/listar',
    component: AuthorsReadComponent,
    children: [
      { path: 'detalhes/:id', component: AuthorsDetailsComponent },
      { path: 'editar/:id', component: AuthorsUpdateComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(authorsRoutes)],
  exports: [RouterModule],
})
export class AuthorsRoutingModule {}