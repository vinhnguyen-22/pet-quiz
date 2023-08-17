import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InlineSVGModule } from 'ng-inline-svg';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmptyTableModule } from 'src/app/modules/empty-table/empty-table.module';
import { ProgramEditComponent } from './programs/program-edit/program-edit.component';
import { ProgramListComponent } from './programs/list.component';
import { ProgramsRouting } from './programs-routing';
import { ProgramsComponent } from './programs.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { ProgramDetailComponent } from './programs/program-detail/program-detail.component';
import { TopicListCPModule } from 'src/app/modules/topic-list/topic-list-cp.module';
import { TranslationModule } from 'src/app/modules/i18n/translation.module';
import { SharedModule } from 'src/app/modules/SharedModule/shared.module';

@NgModule({
  declarations: [ProgramEditComponent, ProgramListComponent, ProgramsComponent, ProgramDetailComponent],
  imports: [CommonModule, ProgramsRouting, SharedModule, TopicListCPModule, EmptyTableModule, FormsModule, ReactiveFormsModule, InlineSVGModule, CKEditorModule, TranslationModule],
})
export class ProgramsModule { }
