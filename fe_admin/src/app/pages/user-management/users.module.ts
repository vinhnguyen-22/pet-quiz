import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InlineSVGModule } from 'ng-inline-svg';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { EmptyTableModule } from 'src/app/modules/empty-table/empty-table.module';
import { UserListComponent } from './users/list.component';
import { UsersRouting } from './users-routing';
import { UsersComponent } from './users.component';
import { StatusModule } from 'src/app/modules';
import { TranslationModule } from 'src/app/modules/i18n/translation.module';

@NgModule({
  declarations: [UserEditComponent, UserListComponent, UsersComponent],
  imports: [CommonModule, EmptyTableModule, UsersRouting, FormsModule, ReactiveFormsModule, InlineSVGModule, StatusModule, TranslationModule],
})
export class UsersModule { }
