import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RoleRouting } from './role.routing';
import { RoleComponent } from './role.component';
import { DualListBoxModule } from 'src/app/modules/dual-listbox/dual-listbox.module';

@NgModule({
  declarations: [RoleComponent],
  imports: [CommonModule, RoleRouting, FormsModule, ReactiveFormsModule, DualListBoxModule],
})
export class RoleModule { }
