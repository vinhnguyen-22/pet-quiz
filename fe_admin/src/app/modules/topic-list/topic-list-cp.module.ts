import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { InlineSVGModule } from 'ng-inline-svg';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { TopicListCPComponent } from './topic-list-cp.component';

@NgModule({
  declarations: [TopicListCPComponent],
  imports: [
    CommonModule,
    RouterModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    InlineSVGModule,
    NgbModalModule,
  ],
  exports: [TopicListCPComponent],
})
export class TopicListCPModule { }
