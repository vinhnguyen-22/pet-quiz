import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TopicEditComponent } from './topics/topic-edit/topic-edit.component';
import { TopicListComponent } from './topics/list.component';
import { TopicsRouting } from './topics-routing';
import { TopicsComponent } from './topics.component';
import { EmptyTableModule } from 'src/app/modules/empty-table/empty-table.module';
import { InputImgModule } from 'src/app/modules/inputImg/inputImg.module';
import { InlineSVGModule } from 'ng-inline-svg';
import { TopicEditEvaluationFormComponent } from './topics/topic-edit-evaluation-form/topic-edit-evaluation-form.component';
import { SharedModule } from 'src/app/modules/SharedModule/shared.module';
import { TranslationModule } from 'src/app/modules/i18n/translation.module';

@NgModule({
  declarations: [TopicEditComponent, TopicListComponent, TopicsComponent, TopicEditEvaluationFormComponent],
  imports: [
    CommonModule,
    EmptyTableModule,
    TopicsRouting,
    FormsModule,
    ReactiveFormsModule,
    InputImgModule,
    InlineSVGModule,
    SharedModule,
    TranslationModule
  ],
})
export class TopicsModule { }
