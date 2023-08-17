import { Component, Input, ViewChild, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-video-hls',
  templateUrl: './video-hls.component.html',
  styleUrls: ['./video-hls.component.css'],
})
export class VideoHlsComponent {
  @Input('url') url: string;
  @Input('controls') controls: string;
  @ViewChild('video') Video: any;
  @Output() setVideo: any = new EventEmitter<any>();
  @Output() endVideo: any = new EventEmitter<any>();
  isM3U8 = true;
  isFirst = false;
  constructor(private cd: ChangeDetectorRef) {}
  ngOnInit(): void {}
  ngOnChanges(): void {
    if (this.url != '') {
      let arr = this.url.split('.');
      if (arr.length > 0) {
        this.isM3U8 = arr[arr.length - 1] == 'm3u8';
      }
    }
  }
  _endVideo = () => {
    this.endVideo.emit();
  };
  ngAfterViewChecked(): void {
    if (this.url && !this.isFirst) {
      this.setVideo.emit({
        data: this.Video,
      });
      this.isFirst = true;
    }
    this.cd.detectChanges();
  }
}
