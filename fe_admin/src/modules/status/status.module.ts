import { StatusComponent } from './status.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [CommonModule],
  declarations: [StatusComponent],
  exports: [StatusComponent],
})
export class StatusModule {}
