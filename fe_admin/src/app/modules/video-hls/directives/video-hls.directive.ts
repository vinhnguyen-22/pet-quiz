import { Directive, ElementRef, OnInit, Input } from '@angular/core';
import HLS from 'hls.js';

@Directive({
  selector: '[appVideoHls]',
})
export class VideoHlsDirective implements OnInit {
  @Input('scr') scr: any;
  currentLink = '';
  private hls: any;
  private element: HTMLVideoElement;

  constructor(videoPlayer: ElementRef) {
    this.element = videoPlayer.nativeElement;
  }

  ngOnInit(): void {
    this.establishHlsStream();
  }
  ngOnDestroy(): void {
    this.hls.stopLoad();
  }
  ngOnChanges(): void {
    if (this.currentLink != this.scr) {
      if (this.hls) {
        this.hls.stopLoad();
      }
      this.establishHlsStream();
    }
  }
  establishHlsStream(): void {
    if (this.hls) {
      this.hls.destroy();
    }
    this.hls = new HLS({
      startLevel: 2,
      capLevelToPlayerSize: true,
    });

    if (HLS.isSupported()) {
      this.hls.loadSource(this.scr);
      this.hls.attachMedia(this.element);
    }
    this.currentLink = this.scr;
  }
}
