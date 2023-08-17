
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanDeactivateGuard } from 'src/app/containers/guards/can-deactivate/can-deactivate.guard';
import { NewsComponent } from './news.component';
import { NewListComponent } from './news/list.component';
import { NewEditComponent } from './news/new-edit/new-edit.component';

const routes: Routes = [
  {
    path: '',
    component: NewsComponent,
    children: [

      {
        path: '',
        component: NewListComponent,
      }, {
        path: 'add',
        component: NewEditComponent,
        canDeactivate: [CanDeactivateGuard]
      },
      {
        path: 'edit',
        component: NewEditComponent,
        canDeactivate: [CanDeactivateGuard]
      },
      {
        path: 'edit/:id',
        component: NewEditComponent,
        canDeactivate: [CanDeactivateGuard]
      },
      { path: '', redirectTo: 'notifications', pathMatch: 'full' },
      { path: '**', redirectTo: 'notifications', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotificationsRouting { }
