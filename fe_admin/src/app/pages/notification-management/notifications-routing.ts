
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanDeactivateGuard } from 'src/app/containers/guards/can-deactivate/can-deactivate.guard';
import { NotificationsComponent } from './notifications.component';
import { NotificationListComponent } from './notifications/list.component';
import { OrganizationNotificationEditComponent } from './notifications/organization-notification-edit/organization-notification-edit.component';

const routes: Routes = [
  {
    path: '',
    component: NotificationsComponent,
    children: [

      {
        path: '',
        component: NotificationListComponent,
      },
      {
        path: 'organization-edit',
        component: OrganizationNotificationEditComponent,
        canDeactivate: [CanDeactivateGuard]
      },
      {
        path: 'organization-edit/:id',
        component: OrganizationNotificationEditComponent,
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
