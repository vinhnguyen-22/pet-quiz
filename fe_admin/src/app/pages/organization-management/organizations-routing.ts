import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanDeactivateGuard } from 'src/app/containers/guards/can-deactivate/can-deactivate.guard';
import { OrganizationsComponent } from './organizations.component';

import { OrganizationListComponent } from './organizations/list.component';
import { OrganizationEditComponent } from './organizations/organization-edit/organization-edit.component';

const routes: Routes = [
  {
    path: '',
    component: OrganizationsComponent,
    children: [
      {
        path: '',
        component: OrganizationListComponent,
      },
      {
        path: 'add',
        component: OrganizationEditComponent,
        canDeactivate: [CanDeactivateGuard],
      },
      {
        path: 'edit',
        component: OrganizationEditComponent,
        canDeactivate: [CanDeactivateGuard],
      },
      {
        path: 'edit/:id',
        component: OrganizationEditComponent,
        canDeactivate: [CanDeactivateGuard],
      },
      { path: '', redirectTo: 'organizations', pathMatch: 'full' },
      { path: '**', redirectTo: 'organizations', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrganizationsRouting {}
