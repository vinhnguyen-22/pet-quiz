import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { InlineSVGModule } from 'ng-inline-svg';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { EmptyTableModule } from 'src/app/modules/empty-table/empty-table.module';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { SharedModule } from 'src/app/modules/SharedModule/shared.module';
import { DocumentLibraryComponent } from './document-library.component';
import { DocumentLibraryRouting } from './document-library.routing';
import { DocumentAddComponent } from './document-add/document-add.component';
import { DocumentListComponent } from './document-list/document-list.component';
import { VideoHlsModule } from 'src/app/modules/video-hls/video-hls.module';
import { ModalDocumentModule } from 'src/app/modules/modal-document/modal-document.module';
import { InputDocumentModule } from 'src/app/modules/inputDocument/inputDocument.module';
import { TranslationModule } from 'src/app/modules/i18n/translation.module';
import { PagingModule } from 'src/app/modules/paging/paging.module';
@NgModule({
  declarations: [DocumentLibraryComponent, DocumentAddComponent, DocumentListComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    DocumentLibraryRouting,
    FormsModule,
    EmptyTableModule,
    ReactiveFormsModule,
    InlineSVGModule,
    NgbModalModule,
    ModalDocumentModule,
    InputDocumentModule,
    PagingModule,
    SharedModule,
    VideoHlsModule,
    TranslationModule,
  ],
})
export class DocumentLibraryModule {}
