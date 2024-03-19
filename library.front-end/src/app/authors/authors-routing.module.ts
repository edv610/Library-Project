import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthorsComponent } from './authors.component';
import { AuthorsCreateComponent } from './authors-create/authors-create.component';
import { AuthorsReadComponent } from './authors-read/authors-read.component';
import { AuthorsDetailsComponent } from './authors-read/authors-details/authors-details.component';
import { AuthorsUpdateComponent } from './authors-update/authors-update.component';
import { AuthGuard } from '../guards/auth-guard';

const authorsRoutes: Routes = [
  { path: 'autores', component: AuthorsComponent, canActivate: [AuthGuard] },
  {
    path: 'autores/listar',
    component: AuthorsReadComponent,
    canActivate: [AuthGuard],
  },
  // {
  //   path: 'autores/cadastro',
  //   component: AuthorsCreateComponent,
  //   canActivate: [AuthGuard],
  // },
  // {

  //   children: [
  //     { path: 'detalhes/:id', component: AuthorsDetailsComponent },
  //     { path: 'editar/:id', component: AuthorsUpdateComponent },
  //   ],
  // },
];

@NgModule({
  imports: [RouterModule.forChild(authorsRoutes)],
  exports: [RouterModule],
})
export class AuthorsRoutingModule {}
