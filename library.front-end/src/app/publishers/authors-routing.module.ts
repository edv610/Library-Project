import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PublishersComponent } from './publishers.component';
import { PublishersCreateComponent } from './publishers-create/publishers-create.component';
import { PublishersReadComponent } from './publishers-read/publishers-read.component';
import { PublishersDetailsComponent } from './publishers-read/publishers-details/publishers-details.component';
import { PublishersUpdateComponent } from './publishers-update/publishers-update.component';

const publishersRoutes: Routes = [
  { path: 'editoras', component: PublishersComponent },
  { path: 'editoras/cadastro', component: PublishersCreateComponent },
  {
    path: 'editoras/listar',
    component: PublishersReadComponent,
    children: [
      { path: 'detalhes/:id', component: PublishersDetailsComponent },
      { path: 'editar/:id', component: PublishersUpdateComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(publishersRoutes)],
  exports: [RouterModule],
})
export class PublishersRoutingModule {}
