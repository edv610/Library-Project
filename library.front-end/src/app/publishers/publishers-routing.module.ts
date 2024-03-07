import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PublishersComponent } from './publishers.component';
import { PublishersCreateComponent } from './publishers-create/publishers-create.component';
import { PublishersReadComponent } from './publishers-read/publishers-read.component';
import { PublishersDetailsComponent } from './publishers-read/publishers-details/publishers-details.component';
import { PublishersUpdateComponent } from './publishers-update/publishers-update.component';
import { AuthGuard } from '../guards/auth-guard';

const publishersRoutes: Routes = [
  {
    path: 'editoras',
    component: PublishersComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'editoras/cadastro',
    component: PublishersCreateComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'editoras/listar',
    component: PublishersReadComponent,
    canActivate: [AuthGuard],
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
