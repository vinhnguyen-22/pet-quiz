import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InlineSVGModule } from 'ng-inline-svg';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { EmptyTableModule } from 'src/app/modules/empty-table/empty-table.module';
import { RequestSupportRouting } from './request-support.routing';
import { RequestSupportComponent } from './request-support.component';
@NgModule({
  declarations: [RequestSupportComponent],
  imports: [CommonModule, RequestSupportRouting, FormsModule, ReactiveFormsModule, InlineSVGModule, EmptyTableModule, NgbModalModule],
})
export class RequestSupportModule {}
