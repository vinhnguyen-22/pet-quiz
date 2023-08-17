import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoHlsComponent } from './components/video-hls/video-hls.component';
import { VideoHlsDirective } from './directives/video-hls.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [VideoHlsComponent, VideoHlsDirective],
  exports: [VideoHlsComponent],
})
export class VideoHlsModule { }
