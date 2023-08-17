
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanDeactivateGuard } from 'src/app/containers/guards/can-deactivate/can-deactivate.guard';
import { StructureComponent } from './structure.component';

import { StructureListComponent } from './structures/list.component';
import { StructureEditComponent } from './structures/structure-edit/structure-edit.component';

const routes: Routes = [
  {
    path: '',
    component: StructureComponent,
    children: [

      {
        path: '',
        component: StructureListComponent,
      },
      {
        path: 'add',
        component: StructureEditComponent,
        canDeactivate: [CanDeactivateGuard]
      },
      {
        path: 'edit',
        component: StructureEditComponent,
        canDeactivate: [CanDeactivateGuard]
      },
      {
        path: 'edit/:id',
        component: StructureEditComponent,
        canDeactivate: [CanDeactivateGuard]
      },
      { path: '', redirectTo: 'Structures', pathMatch: 'full' },
      { path: '**', redirectTo: 'Structures', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StructuresRouting { }
