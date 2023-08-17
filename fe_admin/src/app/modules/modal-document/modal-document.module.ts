import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { InlineSVGModule } from 'ng-inline-svg';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { ModalDocumentComponent } from './modal-document.component';
import { VideoHlsModule } from '../video-hls/video-hls.module';

@NgModule({
  declarations: [ModalDocumentComponent],
  imports: [
    CommonModule,
    RouterModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    InlineSVGModule,
    NgbModalModule,
    VideoHlsModule,
  ],
  exports: [ModalDocumentComponent],
})
export class ModalDocumentModule {}
