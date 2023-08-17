import { ChangeDetectorRef, Component, HostListener, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DOCUMENT_USAGE_TYPE, HTTP_RESPONSE_TYPE } from 'src/app/containers/constants';
import { DocumentService } from 'src/app/containers/services/document.service';

@Component({
  selector: 'document-add',
  templateUrl: './document-add.component.html',
  styleUrls: ['./document-add.component.scss'],
})
export class DocumentAddComponent implements OnInit {
  documentUsageType: number;
  fileInput: any;
  fileData: any;
  dragAreaClass: string;
  FILE_UPLOAD_STATUS = {
    IS_UPLOADING: 0,
    FILE_UPLOADED: 1,
    DOCUMENT_CREATED_SUCCESSFULLY: 2,
    DOCUMENT_CREATED_ERROR: 3,
  };

  filesToUpload: any[] = [];

  $DOCUMENT_USAGE_TYPE = DOCUMENT_USAGE_TYPE;

  constructor(private cd: ChangeDetectorRef, private documentService: DocumentService, private toastr: ToastrService) {}

  ngOnInit() {
    this.dragAreaClass = 'dragarea';
    let url = window.location.href.split('/');
    if (url[url.length - 2] == 'game') {
      this.documentUsageType = DOCUMENT_USAGE_TYPE.FOR_GAME;
    } else {
      this.documentUsageType = DOCUMENT_USAGE_TYPE.FOR_LESSON;
    }
    this.cd.detectChanges();
  }

  @HostListener('dragover', ['$event']) onDragOver(event: any) {
    this.dragAreaClass = 'droparea';
    event.preventDefault();
  }

  @HostListener('dragenter', ['$event']) onDragEnter(event: any) {
    this.dragAreaClass = 'droparea';
    event.preventDefault();
  }

  @HostListener('dragend', ['$event']) onDragEnd(event: any) {
    this.dragAreaClass = 'dragarea';
    event.preventDefault();
  }

  @HostListener('dragleave', ['$event']) onDragLeave(event: any) {
    this.dragAreaClass = 'dragarea';
    event.preventDefault();
  }

  @HostListener('drop', ['$event']) onDrop(event: any) {
    this.dragAreaClass = 'dragarea';
    event.preventDefault();
    event.stopPropagation();

    if (event.dataTransfer.files) {
      let files: FileList = event.dataTransfer.files;
      this.fileData = files;
    }
  }
  setInput(event) {
    if (event.file) this.fileInput = event.file.nativeElement;
    if (event.fileToUpload) {
      this.filesToUpload = this.filesToUpload.map((x) => {
        if (x.idx == event.fileToUpload.idx) {
          return event.fileToUpload;
        } else {
          return x;
        }
      });
      let doc = this.filesToUpload.find((x) => x.idx == event.fileToUpload.idx);
      if (!doc) {
        this.filesToUpload.push(event.fileToUpload);
      }
    }
  }
  onBlurMethod(e, file) {
    this.documentService
      .createDocument(file)
      .then((res: any) => {
        if (!res) {
          return;
        }
        if (res.status === HTTP_RESPONSE_TYPE.SUCCESS) {
          this.toastr.success('', res.message);
          file.message = res.message;
          file.isUpdate = false;
          file = { ...file, ...res.returnData };
          file.isUpdate = false;
          this.cd.detectChanges();
        } else {
          this.toastr.error('', res.message);
        }
      })
      .catch((err) => {
        this.toastr.error('', err.message);
      });
  }
  onUpdate(form, file) {
    file.isUpdate = true;
    this.cd.detectChanges();
    var className = '.' + form;
    var item: any = document.querySelector(className);
    item.focus();
  }
}
