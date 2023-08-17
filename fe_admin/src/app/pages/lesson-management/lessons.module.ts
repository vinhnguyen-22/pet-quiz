import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InlineSVGModule } from 'ng-inline-svg';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LessonEditComponent } from './lessons/lesson-edit/lesson-edit.component';
import { EmptyTableModule } from 'src/app/modules/empty-table/empty-table.module';
import { LessonListComponent } from './lessons/list.component';
import { LessonsRouting } from './lessons-routing';
import { LessonsComponent } from './lessons.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { LessonContentModule } from 'src/app/modules/lesson/content/content.module';
import { LessonInformationModule } from 'src/app/modules/lesson/information/information.module';
import { SharedModule } from 'src/app/modules/SharedModule/shared.module';
import { TranslationModule } from 'src/app/modules/i18n/translation.module';

@NgModule({
  declarations: [LessonEditComponent, LessonListComponent, LessonsComponent],
  imports: [
    CommonModule,
    LessonsRouting,
    FormsModule,
    ReactiveFormsModule,
    EmptyTableModule,
    InlineSVGModule,
    LessonContentModule,
    LessonInformationModule,
    CKEditorModule,
    SharedModule,
    TranslationModule
  ],
})
export class LessonsModule { }
