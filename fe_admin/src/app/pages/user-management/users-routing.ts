import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanDeactivateGuard } from 'src/app/containers/guards/can-deactivate/can-deactivate.guard';
import { UsersComponent } from './users.component';
import { UserListComponent } from './users/list.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';
const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
    children: [
      {
        path: '',
        component: UserListComponent,
      },
      {
        path: 'add',
        component: UserEditComponent,
        canDeactivate: [CanDeactivateGuard],
      },
      {
        path: 'edit/:id',
        component: UserEditComponent,
        canDeactivate: [CanDeactivateGuard],
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
export class UsersRouting {}
