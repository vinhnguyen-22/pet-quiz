import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InlineSVGModule } from 'ng-inline-svg';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { EmptyTableModule } from 'src/app/modules/empty-table/empty-table.module';
import { FeedbacksRouting } from './feedbacks-routing';
import { FeedbacksComponent } from './feedbacks.component';
import { TranslationModule } from 'src/app/modules/i18n/translation.module';

@NgModule({
  declarations: [FeedbacksComponent],
  imports: [CommonModule, EmptyTableModule, FeedbacksRouting, FormsModule, TranslationModule, ReactiveFormsModule, InlineSVGModule, NgbModalModule],
})
export class FeedbacksModule { }
