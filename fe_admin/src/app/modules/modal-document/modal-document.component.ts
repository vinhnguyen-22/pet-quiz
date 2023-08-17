import { Component, OnInit, Input, ChangeDetectorRef, EventEmitter, Output, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DOCUMENT_USAGE_TYPE, FILE_TYPE } from 'src/app/containers/constants';

@Component({
  selector: 'app-modal-document',
  templateUrl: './modal-document.html',
  styleUrls: ['./modal-document.scss'],
})
export class ModalDocumentComponent implements OnInit {
  @ViewChild('PreviewDocumentModalView') private PreviewDocumentModalView!: TemplateRef<ModalDocumentComponent>;
  @Output() close = new EventEmitter<any>();
  @Input() isOpen: any = 'isOpen';
  @Input() documentView: any = 'documentView';
  topics: any = [];
  $DOCUMENT_FILE_TYPE = FILE_TYPE;
  $DOCUMENT_USAGE_TYPE = DOCUMENT_USAGE_TYPE;
  constructor(private cd: ChangeDetectorRef, private modalService: NgbModal) {}
  ngOnInit(): void {}
  ngOnChanges(): void {
    if (this.isOpen) {
      let result = this.modalService.open(this.PreviewDocumentModalView, {
        size: 'lg',
        backdrop: 'static',
      });
      if (this.documentView.documentTypeId == this.$DOCUMENT_FILE_TYPE.GAME)
        result.shown.subscribe(() => {
          this.setSrcGame();
        });
      result.result.then((result) => {
        this.close.emit({});
      });
    }
  }
  endTranscript = () => {
    let transcriptAudio: any = document.getElementById('transcriptAudio');
    transcriptAudio.pause();
  };
  setSrcGame = () => {
    let game = document.getElementById('gameControl') as HTMLIFrameElement;
    if (game !== null) {
      game.src = this.documentView.fileContent;
    }
    this.cd.detectChanges();
  };
}
