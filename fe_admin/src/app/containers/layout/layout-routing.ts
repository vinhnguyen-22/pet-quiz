import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoleGuard } from '../guards/role.guard';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'student-management',
        loadChildren: () => import('../../pages/student-management/student-management.module').then((m) => m.StudentManagementModule),
        canActivate: [RoleGuard],
      },

      {
        path: 'users',
        loadChildren: () => import('../../pages/user-management/users.module').then((m) => m.UsersModule),
        canActivate: [RoleGuard],
      },
      {
        path: '**',
        redirectTo: 'error/404',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
