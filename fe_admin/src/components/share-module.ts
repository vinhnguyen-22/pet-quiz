import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { AbstractTableComponent } from './abstract-table/abstract-table.component';

@NgModule({
  imports: [CommonModule],
  declarations: [AbstractTableComponent],
  exports: [AbstractTableComponent, CommonModule],
})
export class ShareModule {}
