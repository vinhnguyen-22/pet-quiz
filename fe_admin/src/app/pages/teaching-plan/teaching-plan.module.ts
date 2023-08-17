import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TeachingPlanComponent } from './teaching-plan.component';
import { TeachingPlanRouting } from './teaching-plan.routing';
import { EmptyTableModule } from 'src/app/modules/empty-table/empty-table.module';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [TeachingPlanComponent],
  imports: [CommonModule, NgSelectModule, TeachingPlanRouting, FormsModule, ReactiveFormsModule, EmptyTableModule],
})
export class TeachingPlanModule {}
