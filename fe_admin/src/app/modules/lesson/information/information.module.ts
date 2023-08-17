

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { NgbDatepickerModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { InlineSVGModule } from 'ng-inline-svg';
import { InformationComponent } from './information.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InlineSVGModule,
    NgbModalModule,
    CKEditorModule,
    NgbDatepickerModule,
    NgMultiSelectDropDownModule.forRoot(),
  ],
  declarations: [InformationComponent],
  exports: [InformationComponent],
})
export class LessonInformationModule { }
