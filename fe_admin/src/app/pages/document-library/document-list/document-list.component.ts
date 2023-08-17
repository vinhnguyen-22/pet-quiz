import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DOCUMENT_USAGE_TYPE, FILE_TYPE, AKITA_STORE, HTTP_RESPONSE_TYPE } from 'src/app/containers/constants';
import { AuthService } from 'src/app/containers/services/auth/auth.service';
import { DocumentService } from 'src/app/containers/services/document.service';
import { CommonModalComponent } from 'src/app/modules/SharedModule/modal/modal.component';
import { OptionQuery } from 'src/app/store/option/optionQuery';
import { ToastrService } from 'ngx-toastr';
import { ShareService } from 'src/app/containers/services/share/share.service';

@Component({
  selector: 'document-list',
  templateUrl: './document-list.component.html',
})
export class DocumentListComponent implements OnInit {
  documentUsageType: number = DOCUMENT_USAGE_TYPE.FOR_GAME;

  @ViewChild('confirmationModal')
  private modalComponent!: CommonModalComponent;

  @ViewChild('PreviewDocumentModalView') ModalView: any;

  documentView: any = {};

  currentUser: any = {};
  documents: any = [];
  documentTypes: any = [];

  $SELECT_ALL = 0;

  // default value for filter
  filter = {
    name: '',
    page: 1,
    pageSize: 10,
    documentTypeId: this.$SELECT_ALL,
    usageType: DOCUMENT_USAGE_TYPE.FOR_GAME,
  };
  dataPaging: any = {
    pageSize: 0,
    totalItems: 0,
    page: 0,
    datas: [],
  };
  $DOCUMENT_FILE_TYPE = FILE_TYPE;
  $DOCUMENT_USAGE_TYPE = DOCUMENT_USAGE_TYPE;
  isOpen: boolean = false;

  constructor(
    private documentService: DocumentService,
    public authenticationService: AuthService,
    private cd: ChangeDetectorRef,
    public modalService: NgbModal,
    private optionQuery: OptionQuery,
    private router: Router,
    private toastr: ToastrService,
    public sharedService: ShareService
  ) {
    this.authenticationService.currentUserSubject.asObservable().subscribe((res) => {
      this.currentUser = res;
      let url = window.location.href.split('/');
      if (url[url.length - 1] == 'game') {
        this.documentUsageType = DOCUMENT_USAGE_TYPE.FOR_GAME;
        this.filter.usageType = DOCUMENT_USAGE_TYPE.FOR_GAME;
      } else {
        this.documentUsageType = DOCUMENT_USAGE_TYPE.FOR_LESSON;
        this.filter.usageType = DOCUMENT_USAGE_TYPE.FOR_LESSON;
      }
    });
  }

  ngOnInit(): void {
    this.loadOption();
  }

  loadOption() {
    let options$ = this.optionQuery.selectAll();
    options$.subscribe((options) => {
      this.setInitialValues(options);
    });
  }

  setInitialValues = (options: any) => {
    if (options.length > 0) {
      this.documentTypes = options[AKITA_STORE.DOCUMENT_TYPE].filter((x) => x.id != FILE_TYPE.GAME);
      this.filter.documentTypeId = this.documentTypes[0].id;
      this.getDocumentForLesson();
    }
  };

  private getDocumentForLesson() {
    this.documentService
      .getDocumentsForLibraryPagination(this.filter)
      .then((res: any) => {
        this.documents = res.datas;
        this.dataPaging = res;
        this.cd.detectChanges();
      })
      .catch();
  }

  removeDocument(document) {
    let values = {
      documentId: document.id,
    };

    this.openRemoveDocumentConfirmationModal(values, 'Xoá học liệu cho bài học', 'Bạn có muốn xoá học liệu "' + document.name + '" không?');
  }

  filterChanged() {
    this.filter = { ...this.filter, page: 1 };
    this.getDocumentForLesson();
  }
  dataChanged($event) {
    this.filter = {
      ...this.filter,
      page: $event.page,
      pageSize: $event.pageSize,
    };
    this.getDocumentForLesson();
  }
  openPreviewDocumentModal = (document: any) => {
    this.documentView = document;
    this.isOpen = true;
    this.cd.detectChanges();
  };

  async openRemoveDocumentConfirmationModal(values, title: string, text: string) {
    return this.modalComponent.openDeleteConfirmationModal(values, title, text);
  }

  getConfirmationValue($event: any) {
    let returnData = $event;

    if (returnData.result == 'Confirm') {
      let documentId = returnData.values.documentId;
      this.documentService
        .remove(documentId)
        .then((res: any) => {
          if (res && res.status == 'Error') {
            this.toastr.error('', res.message);
          } else {
            this.toastr.success('', 'Học liệu đã được xóa thành công');
            this.getDocumentForLesson();
          }
        })
        .catch((e) => {
          this.toastr.error('', 'Xóa học liệu thất bại');
        });
    }
  }

  navigateToAddDocumentScreen() {
    var navigateUrl = 'document-library/lesson/add';
    if (this.documentUsageType == DOCUMENT_USAGE_TYPE.FOR_GAME) {
      navigateUrl = 'document-library/game/add';
    }

    this.router.navigateByUrl(navigateUrl);
  }

  copyDocumentName(document) {
    this.toastr.success('', 'Sao chép tên học liệu thành công');
    navigator.clipboard.writeText(document.name);
  }
  close() {
    this.isOpen = false;
  }
  onBlurMethod(file) {
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
