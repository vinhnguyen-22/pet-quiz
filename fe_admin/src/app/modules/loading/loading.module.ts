
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoadingComponent } from './loading.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgxSpinnerModule
  ],
  declarations: [LoadingComponent],
  exports: [LoadingComponent],
})
export class LoadingModule { }
