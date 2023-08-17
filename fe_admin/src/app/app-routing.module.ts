import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './containers/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'error',
    loadChildren: () => import('./pages/z_error_page/errors.module').then((m) => m.ErrorsModule),
  },
  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: () => import('./containers/layout/layout.module').then((m) => m.LayoutModule),
  },
  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/lesson/lesson.module').then((m) => m.LessonModule),
  },
  { path: '**', redirectTo: 'error/404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
