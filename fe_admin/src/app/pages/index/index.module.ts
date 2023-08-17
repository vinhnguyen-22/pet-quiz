

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { InlineSVGModule } from 'ng-inline-svg';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDatepickerModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { IndexComponent } from './index.component';
import { IndexRouting } from './index.routing';
import { PipesModule } from './../../pipes/pipes.module';

@NgModule({
  declarations: [IndexComponent],
  imports: [
    CommonModule,
    PipesModule,
    HttpClientModule,
    IndexRouting,
    FormsModule,
    ReactiveFormsModule,
    InlineSVGModule,
    NgbModalModule,
    NgbDatepickerModule,
  ],
})
export class IndexModule { }
