import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProgramsComponent } from './programs.component';
import { ProgramListComponent } from './programs/list.component';
import { ProgramEditComponent } from './programs/program-edit/program-edit.component';
import { ProgramDetailComponent } from './programs/program-detail/program-detail.component';
import { CanDeactivateGuard } from 'src/app/containers/guards/can-deactivate/can-deactivate.guard';

const routes: Routes = [
  {
    path: '',
    component: ProgramsComponent,
    children: [
      {
        path: '',
        component: ProgramListComponent,
      },
      {
        path: 'add',
        component: ProgramEditComponent,
        canDeactivate: [CanDeactivateGuard]
      },
      {
        path: 'edit',
        component: ProgramEditComponent,
        canDeactivate: [CanDeactivateGuard]
      },
      {
        path: 'edit/:id',
        component: ProgramEditComponent,
        canDeactivate: [CanDeactivateGuard]
      },
      {
        path: ':id',
        component: ProgramDetailComponent,
      },
      { path: '', redirectTo: 'users', pathMatch: 'full' },
      { path: '**', redirectTo: 'users', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProgramsRouting {}
