import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InlineSVGModule } from 'ng-inline-svg';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { NewEditComponent } from './news/new-edit/new-edit.component';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { NewListComponent } from './news/list.component';
import { NotificationsRouting } from './news-routing';
import { NewsComponent } from './news.component';
import { InputImgModule } from 'src/app/modules/inputImg/inputImg.module';
import { EmptyTableModule } from 'src/app/modules/empty-table/empty-table.module';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { SharedModule } from 'src/app/modules/SharedModule/shared.module';
import { TranslationModule } from 'src/app/modules/i18n/translation.module';

@NgModule({
  declarations: [NewEditComponent, NewListComponent, NewsComponent],
  imports: [
    CommonModule,
    PipesModule,
    CKEditorModule,
    NotificationsRouting,
    FormsModule,
    ReactiveFormsModule,
    InlineSVGModule,
    EmptyTableModule,
    InputImgModule,
    NgbModalModule,
    SharedModule,
    TranslationModule
  ],
})
export class NewsModule { }
