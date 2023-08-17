import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InlineSVGModule } from 'ng-inline-svg';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { EmptyTableModule } from 'src/app/modules/empty-table/empty-table.module';
import { NotificationListComponent } from './notifications/list.component';
import { NotificationsRouting } from './notifications-routing';
import { NotificationsComponent } from './notifications.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { OrganizationNotificationEditComponent } from './notifications/organization-notification-edit/organization-notification-edit.component';
import { TranslationModule } from 'src/app/modules/i18n/translation.module';

@NgModule({
  declarations: [NotificationListComponent, NotificationsComponent, OrganizationNotificationEditComponent],
  imports: [CommonModule, TranslationModule, EmptyTableModule, NotificationsRouting, FormsModule, ReactiveFormsModule, InlineSVGModule, CKEditorModule, NgbModalModule],
})
export class NotificationsModule { }
