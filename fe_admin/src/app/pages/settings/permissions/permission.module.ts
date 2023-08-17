import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PermissionRouting } from './permission.routing';
import { PermissionComponent } from './permission.component';
import { EmptyTableModule } from 'src/app/modules/empty-table/empty-table.module';
import { InlineSVGModule } from 'ng-inline-svg';

@NgModule({
  declarations: [PermissionComponent],
  imports: [CommonModule, PermissionRouting, FormsModule, ReactiveFormsModule, EmptyTableModule, InlineSVGModule],
})
export class PermissionModule {}
