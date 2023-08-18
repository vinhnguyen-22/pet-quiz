import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ErrorsComponent } from './errors.component';
import { ErrorRouting } from './error.routing';


@NgModule({
  declarations: [ErrorsComponent],
  imports: [
    CommonModule,
    ErrorRouting
  ]
})
export class ErrorsModule { }
