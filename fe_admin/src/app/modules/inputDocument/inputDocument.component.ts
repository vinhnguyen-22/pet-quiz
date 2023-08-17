import { Component, Input, Output, EventEmitter, ChangeDetectorRef, HostListener, ViewChild, ElementRef } from '@angular/core';
import { ShareService } from 'src/app/containers/services/share/share.service';
import { DOCUMENT_FILE_TYPE_NAME, DOCUMENT_STORAGE_FOLDER, DOCUMENT_USAGE_TYPE, FILE_TYPE, HTTP_RESPONSE_TYPE } from 'src/app/containers/constants';
import { DocumentService } from 'src/app/containers/services/document.service';
import { HttpEventType } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-input-document',
  templateUrl: './inputDocument.component.html',
  styleUrls: ['./inputDocument.scss'],
})
export class InputDocumentComponent {
  @Input() documentUsageType: any;
  @ViewChild('fileInput') fileInput: any;
  @Input() fileData: any;
  @Output() setInput = new EventEmitter<any>();
  @Output() setRes = new EventEmitter<any>();
  currentIdx = 1;
  error: string;
  storageFolder: string;
  fileType: string;
  FILE_UPLOAD_STATUS = {
    IS_UPLOADING: 0,
    FILE_UPLOADED: 1,
    DOCUMENT_CREATED_SUCCESSFULLY: 2,
    DOCUMENT_CREATED_ERROR: 3,
  };

  documentUploadError = 'Học liệu tải lên bị lỗi.';
  notCorrectFileType = 'Không đúng định dạng.';

  imageAttribute = 'image/*';
  audioAttribute = 'audio/*';
  videoAttribute = 'video/*';

  allowedExtensions = ['.mp3', '.mp4', '.jpg', 'jpeg', '.png', 'gif'];

  acceptAttributes = this.imageAttribute + ',' + this.audioAttribute + ',' + this.videoAttribute;

  $DOCUMENT_USAGE_TYPE = DOCUMENT_USAGE_TYPE;
  $HTTP_RESPONSE_TYPE = HTTP_RESPONSE_TYPE;
  isFirst: any;

  constructor(
    private shareService: ShareService,
    private documentService: DocumentService,
    private cd: ChangeDetectorRef,
    private toastr: ToastrService
  ) {}

  ngOnChanges() {
    if (this.documentUsageType == DOCUMENT_USAGE_TYPE.FOR_GAME || this.documentUsageType == DOCUMENT_USAGE_TYPE.FOR_LESSON) {
      this.storageFolder = DOCUMENT_STORAGE_FOLDER.FOR_LESSON;
      if (this.documentUsageType == DOCUMENT_USAGE_TYPE.FOR_GAME) {
        this.storageFolder = DOCUMENT_STORAGE_FOLDER.FOR_GAME;
      }
    }
    if (this.fileData) {
      this.saveFiles(this.fileData);
    }
  }
  ngAfterViewChecked(): void {
    if ((this.documentUsageType == 0 || this.documentUsageType == 1) && !this.isFirst) {
      this.setInput.emit({ file: this.fileInput });
      this.isFirst = true;
      this.cd.detectChanges();
    }
  }
  onFileChange(event: any) {
    let files: FileList = event.target.files;
    this.saveFiles(files);
  }

  saveFiles(files: FileList) {
    let attributeArray = this.acceptAttributes.split(',');
    var regExString = '';
    for (let i = 0; i < attributeArray.length; i++) {
      let attribute = attributeArray[i];
      regExString = regExString + attribute;
      if (i != attributeArray.length - 1) {
        regExString = regExString + '|';
      }
    }
    var regEx = new RegExp(regExString.replace('*', '.*'));
    var imageRegEx = new RegExp(this.imageAttribute.replace('*', '.*'));
    var videoRegEx = new RegExp(this.videoAttribute.replace('*', '.*'));
    for (let i = 0; i < files.length; i++) {
      let file = files[i];
      // check file type before uploading
      var isCorrectFileType = regEx.test(file.type);

      var extensionAllowedRegex = '(' + this.allowedExtensions.join('|').replace(/\./g, '\\.') + ')$';
      var extensionAllowed = new RegExp(extensionAllowedRegex, 'i').test(file.name);

      let documentName = file.name.replace(/\.[^/.]+$/, '');

      let fileToUpload = {
        idx: this.currentIdx,
        fileName: file.name,
        name: documentName,
        size: file.size,
        relativePath: '',
        actualPath: '',
        uploadedPercentage: 0,
        status: this.FILE_UPLOAD_STATUS.IS_UPLOADING,
        message: '',
      };

      this.currentIdx += 1;
      let documentTypeId = FILE_TYPE.AUDIO;
      let documentTypeName = DOCUMENT_FILE_TYPE_NAME.AUDIO;
      this.fileType = 'audio';
      if (imageRegEx.test(file.type)) {
        documentTypeId = FILE_TYPE.IMAGE;
        this.fileType = 'image';
        documentTypeName = DOCUMENT_FILE_TYPE_NAME.IMAGE;
      } else if (videoRegEx.test(file.type)) {
        documentTypeId = FILE_TYPE.VIDEO;
        this.fileType = 'video';
        documentTypeName = DOCUMENT_FILE_TYPE_NAME.VIDEO;
      }
      this.setInput.emit({ fileToUpload: fileToUpload });

      if (isCorrectFileType && extensionAllowed) {
        // if the file is accepted then upload file
        this.shareService
          .uploadProgress([file], this.storageFolder, this.fileType)
          .then((res: any) => {
            res.subscribe((event: any) => {
              this.cd.detectChanges();
              switch (event.type) {
                case HttpEventType.Sent:
                  break;
                case HttpEventType.ResponseHeader:
                  break;
                case HttpEventType.UploadProgress:
                  var uploadedPercentage = Math.round((event.loaded / event.total) * 100);
                  fileToUpload.uploadedPercentage = uploadedPercentage;
                  fileToUpload.status = this.FILE_UPLOAD_STATUS.IS_UPLOADING;
                  fileToUpload.message = uploadedPercentage + '%';
                  this.setInput.emit({ fileToUpload: fileToUpload });
                  break;
                case HttpEventType.Response:
                  if (fileToUpload.uploadedPercentage == 100) {
                    let actualPath = event.body.path;
                    fileToUpload.relativePath = event.body.path;
                    fileToUpload.actualPath = actualPath;

                    fileToUpload.status = this.FILE_UPLOAD_STATUS.FILE_UPLOADED;
                    let usageType = this.documentUsageType;
                    this.setInput.emit({ fileToUpload: fileToUpload });
                    let document = {
                      name: fileToUpload.name,
                      docTypeName: documentTypeName,
                      documentTypeId: documentTypeId,
                      fileContent: fileToUpload.actualPath,
                      usageType: usageType,
                    };
                    this.documentService
                      .createDocument(document)
                      .then((res: any) => {
                        if (!res) {
                          return;
                        }
                        if (res.status === HTTP_RESPONSE_TYPE.SUCCESS) {
                          fileToUpload = { ...fileToUpload, ...res.returnData };
                          fileToUpload.status = this.FILE_UPLOAD_STATUS.DOCUMENT_CREATED_SUCCESSFULLY;
                          if (res.returnData.documentTypeId == FILE_TYPE.VIDEO) {
                            this.toastr.warning('', 'Học liệu chưa khả dụng do Video đang được tải lên');
                          }
                          this.toastr.success('', res.message);
                          fileToUpload.message = res.message;
                        } else {
                          fileToUpload.status = this.FILE_UPLOAD_STATUS.DOCUMENT_CREATED_ERROR;
                          fileToUpload.message = res.message;
                          this.toastr.error('', res.message);
                        }
                        this.setInput.emit({ fileToUpload: fileToUpload });
                      })
                      .catch((err) => {
                        fileToUpload.status = this.FILE_UPLOAD_STATUS.DOCUMENT_CREATED_ERROR;
                        fileToUpload.message = this.documentUploadError;
                        this.toastr.error('', fileToUpload.message);
                        this.setInput.emit({ fileToUpload: fileToUpload });
                      });
                  }
              }
            });
          })
          .catch((e: any) => {
            alert('Tải dữ liệu thất bại');
          });
      } else {
        // if not correct file type then change status to error
        fileToUpload.status = this.FILE_UPLOAD_STATUS.DOCUMENT_CREATED_ERROR;
        fileToUpload.message = this.notCorrectFileType;
        this.cd.detectChanges();
      }
    }
  }
}
