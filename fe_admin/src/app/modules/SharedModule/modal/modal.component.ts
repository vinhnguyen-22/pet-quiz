import { Component, EventEmitter, Injectable, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal, NgbModalConfig, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { MODAL_BUTTON_STYLE, MODAL_STYLE, MODAL_TYPE } from 'src/app/constants';

@Component({
  selector: 'common-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  providers: [NgbModalConfig, NgbModal]
})

@Injectable()
export class CommonModalComponent implements OnInit {
  @ViewChild('confirmationModal') private modalContent!: TemplateRef<CommonModalComponent>
  @Output() newConfirmationEvent = new EventEmitter<any>();

  modalType: any;
  modalStyle: any;
  modalTitle: any;
  modalBody: any;
  modalButtonColor: any;

  private modalRef!: NgbModalRef;

  $MODAL_TYPE = MODAL_TYPE;
  constructor(config: NgbModalConfig, private modalService: NgbModal) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
  }

  openDeleteConfirmationModal(values: any, title: string, text: string) {
    this.open(MODAL_TYPE.deleteConfirmation, values, title, text, 'sm');
  }

  openConfirmationModal(values: any, title: string, text: string) {
    this.open(MODAL_TYPE.confirmation, values, title, text, 'l');
  }

  private open(modalType: number, values: any, title: string, text: string, modalSize: string): Promise<boolean> {
    this.modalType = modalType;
    this.modalTitle = title;
    this.modalBody = text;

    // change style base on modal type
    if (modalType == MODAL_TYPE.deleteConfirmation) {
      this.modalStyle = MODAL_STYLE.deleteConfirmation;
      this.modalButtonColor = MODAL_BUTTON_STYLE.deleteConfirmation;
    } else if (modalType == MODAL_TYPE.confirmation) {
      this.modalStyle = MODAL_STYLE.confirmation;
      this.modalButtonColor = MODAL_BUTTON_STYLE.confirmation;
    } else {
      this.modalStyle = MODAL_STYLE.default;
      this.modalButtonColor = MODAL_BUTTON_STYLE.default;
    }

    if (modalSize == '') {
      modalSize = 'sm';
    }

    return new Promise<boolean>(resolve => {
      this.modalRef = this.modalService.open(this.modalContent,
        {
          size: modalSize, // size of modal
          centered: true, // center modal vertically
          keyboard: true, // true: allow user to dismiss keyboard by ESC key

          // static: do not allow user dismiss modal by clicking outside
          // change to true will allow dismiss
          backdrop: 'static'
        })

      this.modalRef.result.then((result) => {
        // if confirm
        var returnObject = {
          result: result,
          values: values
        }

        this.newConfirmationEvent.emit(returnObject);
      }, (reason) => {
        // if cancel
        var returnObject = {
          result: reason,
          values: values
        }

        this.newConfirmationEvent.emit(returnObject);
      });
    })
  }
}