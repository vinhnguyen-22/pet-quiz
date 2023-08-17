import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthRoutingModule } from './lesson-routing';
import { LessonComponent } from './lesson.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { VideoHlsModule } from 'src/app/modules/video-hls/video-hls.module';
import { TranslationModule } from 'src/app/modules/i18n/translation.module';

@NgModule({
  declarations: [LessonComponent],
  imports: [CommonModule, AuthRoutingModule, FormsModule, ReactiveFormsModule, HttpClientModule, NgbModule, VideoHlsModule, TranslationModule],
})
export class LessonModule { }
