import { Component, OnInit, Input, ChangeDetectorRef, EventEmitter, Output, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-new',
  templateUrl: './modal-new.html',
  styleUrls: ['./modal-new.scss'],
})
export class ModalNewComponent {
  @ViewChild('New') private New!: TemplateRef<ModalNewComponent>;
  @Output() close = new EventEmitter<any>();
  @Input() isOpen: any = 'isOpen';
  @Input() new: any = 'new';
  constructor(private cd: ChangeDetectorRef, private modalService: NgbModal) {}
  ngOnInit(): void {}
  ngOnChanges(): void {
    if (this.isOpen) {
      let result = this.modalService.open(this.New, {
        size: 'lg',
        backdrop: 'static',
      });
      result.result.then((result) => {
        this.close.emit({});
      });
    }
  }
}
