import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AuthorsCreateComponent } from './authors/authors-create/authors-create.component';
import { AuthorsReadComponent } from './authors/authors-read/authors-read.component';
import { AuthorsDetailsComponent } from './authors/authors-read/authors-details/authors-details.component';
import { AuthorsComponent } from './authors/authors.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  // { path: 'autores', component: AuthorsComponent },
  // { path: 'autores/cadastro', component: AuthorsCreateComponent },
  // { path: 'autores/listar', component: AuthorsReadComponent },

  // { path: 'autores/detalhes/:id', component: AuthorsDetailsComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
