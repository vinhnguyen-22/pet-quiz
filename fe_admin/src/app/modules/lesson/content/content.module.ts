import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { NgbDatepickerModule, NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InlineSVGModule } from 'ng-inline-svg';
import { SharedModule } from '../../SharedModule/shared.module';
import { ContentComponent } from './content.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { VideoHlsModule } from 'src/app/modules/video-hls/video-hls.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ModalDocumentModule } from '../../modal-document/modal-document.module';
import { InputDocumentModule } from '../../inputDocument/inputDocument.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InlineSVGModule,
    NgbModalModule,
    CKEditorModule,
    NgbModule,
    NgbDatepickerModule,
    ModalDocumentModule,
    DragDropModule,
    SharedModule,
    VideoHlsModule,
    InputDocumentModule,
    InfiniteScrollModule,
  ],
  declarations: [ContentComponent],
  exports: [ContentComponent],
})
export class LessonContentModule {}
