import { FilterComponent } from './filter.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  ButtonModule,
  GridModule,
  UtilitiesModule,
  FormModule,
} from '@coreui/angular';
import { FormsModule } from '@angular/forms';
import { IconModule } from '@coreui/icons-angular';

@NgModule({
  imports: [
    CommonModule,
    ButtonModule,
    GridModule,
    UtilitiesModule,
    FormModule,
    FormsModule,
    IconModule,
  ],
  declarations: [FilterComponent],
  exports: [FilterComponent],
})
export class FilterModule {}
