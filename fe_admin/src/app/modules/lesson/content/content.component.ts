import { Component, ViewEncapsulation, OnInit, Input, Output, EventEmitter, ChangeDetectorRef, OnChanges, ViewChild } from '@angular/core';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DOCUMENT_USAGE_TYPE, FILE_TYPE } from 'src/app/containers/constants';
import { OptionQuery } from 'src/app/store/option/optionQuery';
import { CommonModalComponent } from '../../SharedModule/modal/modal.component';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { DocumentService } from 'src/app/containers/services/document.service';
import { AKITA_STORE, STATUSES } from './../../../containers/constants/index';
import { LessonService } from 'src/app/containers/services/lesson.service';

@Component({
  selector: 'app-lesson-content',
  templateUrl: './content.html',
  styleUrls: ['./content.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ContentComponent implements OnInit, OnChanges {
  @ViewChild('confirmationModal')
  private modalComponent!: CommonModalComponent;
  fileInput: any;
  $DOCUMENT_FILE_TYPE = FILE_TYPE;

  filter = {
    typeId: '0',
    searchTerm: '',
  };

  private ACTIVITY_EMPTY = {
    id: 0,
    name: '',
    status: 1,
    sectionId: 0,
    lessonId: 0,
    documentTeaching: '',
    teacherActivity: '',
    timeActivity: '',
    interactiveForm: '',

    nameEn: '',
    documentTeachingEn: '',
    teacherActivityEn: '',
    interactiveFormEn: '',
    timeActivityEn: '',

    documentActivities: [],
  };

  @Input() isRequestContent: any;
  @Input() content: any;
  @Output('onEmitContent') onEmitContent = new EventEmitter<any>();
  activeTabId = 1;
  gameType: any = {
    id: 0,
    name: '',
  };
  currentDocAct: any = {};
  actDocumentTypes: Array<any> = [];
  gameTypes: any = [];
  public Editor = ClassicEditor;

  documentList: any[] = [];

  currentPage: number = 0;
  totalDocuments: number = 0;
  documentTypeId = FILE_TYPE.GAME;

  private defaultPageSize = 12;
  documentView: any;
  isOpen: boolean;
  documentUsageType: number;

  en = 'en';
  vi = 'vi';
  
  constructor(
    private cd: ChangeDetectorRef,
    private optionQuery: OptionQuery,
    private modalService: NgbModal,
    private lessonService: LessonService,
    private documentService: DocumentService
  ) { }
  getEmptyDocumentActivity() {
    return {
      id: 0,
      activityId: 0,
      documentId: 0,
      sortId: 1,
      activity: {},
      document: {
        id: 0,
        usageType: 1,
        documentTypeId: this.$DOCUMENT_FILE_TYPE.GAME,
        name: '',
        fileContent: '',
        docTypeName: 'Game',
        typeId: FILE_TYPE.GAME,
        gameName: '',
        linkAudioTrue: '',
        linkAudioFalse: '',
        gameImage: '',
        status: STATUSES[0].key,
      },
    };
  }
  ngOnChanges(d): void {
    if (this.isRequestContent && d.isRequestContent) {
      this.onEmitContent.emit(this.content.sections);
    }
    if (this.content && d.content) {
      this.content.sections = this.content.sections.map((section, sectionIndex) => {
        if (!section.activities || section.activities.length == 0) {
          let activity = this.getNewAct(section.id);
          
          this.content.activeActivityTabs[sectionIndex] = {};
          this.content.activeActivityTabs[sectionIndex][0] = 0;
          section.activities = [{ ...activity }];
        }
        return section;
      });
    }
  }

  ngOnInit(): void {
    this.loadOption();
    this.documentUsageType = DOCUMENT_USAGE_TYPE.FOR_LESSON;
  }

  loadOption() {
    let options$ = this.optionQuery.selectAll();
    options$.subscribe((options) => {
      this.setInitialValues(options);
    });
  }

  setInitialValues = (options: any) => {
    if (options.length > 0) {
      this.actDocumentTypes = options[AKITA_STORE.DOCUMENT_TYPE];
      this.gameTypes = options[AKITA_STORE.GAME_TYPE];
      this.gameType = options[AKITA_STORE.GAME_TYPE].find((element: any) => element.name == 'Game') || {};
      this.cd.detectChanges();
    }
  };

  filterChanged(documentTypeId: any) {
    this.currentPage = 0;
    this.totalDocuments = 0;
    this.documentList = [];

    this.setDocumentToDisplay();
  }

  getNewAct(sectionId) {
    let activity = { ...this.ACTIVITY_EMPTY, sectionId };
    activity.documentActivities = [this.getEmptyDocumentActivity()];
    return activity;
  }

  addActivity = (section, sectionIndex) => {
    let activity = this.getNewAct(section.id);
    section.activities.push({ ...activity });

    var activityIndex = section.activities.length - 1;
    var activityTabs = this.content.activeActivityTabs;
    if (activityTabs) {
      var activities = activityTabs[sectionIndex];
      if (!activities) {
        activities = {};
      }

      // default is first tab
      var activityTabIndex = 0;
      activities[activityIndex] = activityTabIndex;
      this.cd.detectChanges();
    }
  };

  changeDocumentType = (da: any) => {
    da.document.name = '';
    da.document.fileContent = '';
    da.document.docTypeName = this.actDocumentTypes.find((x) => x.id == da.document.documentTypeId).name;
  };

  setActiveTab(tabId: number) {
    this.activeTabId = tabId;
  }

  addNewPage = (act: any) => {
    if (!act.documentActivities) {
      act.documentActivities = [];
    }
    let documentActivity = this.getEmptyDocumentActivity();
    documentActivity.activityId = act.id;
    act.documentActivities.push(documentActivity);
    this.setDocumentActivitiesSortOrder(act.documentActivities);
  };

  openDocumentList(documentList: any, obj: any, documentTypeId: string) {
    this.currentDocAct = obj;

    this.currentPage = 1;
    let param = {
      name: '',
      // only search document for lesson
      usageType: DOCUMENT_USAGE_TYPE.FOR_LESSON,
      documentTypeId: parseInt(documentTypeId),
      gameTypeId: null,
      page: this.currentPage,
      pageSize: this.defaultPageSize,
    };

    this.documentTypeId = documentTypeId;

    this.documentList = [];
    let modalOptions = {
      size: 'xl',
    };

    var documentListModal = this.modalService.open(documentList, modalOptions);
    documentListModal.result.then(
      (data) => {
        // on close
        this.resetFilter();
      },
      (reason) => {
        // on dismiss
        this.resetFilter();
      }
    );

    this.documentService
      .getDocumentsForLibraryPagination(param)
      .then((res: any) => {
        this.documentList = res.datas;
        this.totalDocuments = res.totalItems;
      })
      .catch((e) => { });
  }

  chooseDocuments = (document: any) => {
    this.currentDocAct.documentId = document.id;
    this.currentDocAct.document = { ...document };
    this.currentDocAct.activity = { timeActivity: 0 };
    this.cd.detectChanges();
    this.modalService.dismissAll();
  };

  getActiveTabCSSClass(tabId: number) {
    if (tabId !== this.activeTabId) {
      return '';
    }
    return 'active';
  }

  getActiveActivityTabCSSClass(sectionIndex, activityIndex, activityTabIndex) {
    var activityTabs = this.content.activeActivityTabs;
    if (activityTabs) {
      if (activityTabs[sectionIndex]) {
        var activities = activityTabs[sectionIndex];
        if (activities[activityIndex] == activityTabIndex) {
          return 'active';
        }
      }
    }
    
    return '';
  }

  setActiveActivityTab(sectionIndex, activityIndex, activityTabIndex) {
    var activityTabs = this.content.activeActivityTabs;
    if (activityTabs) {
      var activities = activityTabs[sectionIndex];
      if (!activities) {
        activities = {};
      }

      activities[activityIndex] = activityTabIndex;
    }
  }

  checkTimeActivity(event, activity) {
    let value = event.target.value;
    if (value <= 0) {
      activity.timeActivity = 1;
    }
  }

  removePage(arr, documentIndex) {
    var values = {
      arr: arr,
      documentIndex: documentIndex,
      type: "Document"
    };

    let title = 'Xác nhận xoá';
    let text = 'Bạn có chắc chắn muốn xoá không?';
    this.openModal(values, title, text);
  }

  async openModal(values, title: string, text: string) {
    return await this.modalComponent.openDeleteConfirmationModal(values, title, text);
  }

  getConfirmationValue($event: any) {
    let returnData = $event;
    if (returnData.result == 'Confirm') {
      if (returnData.values.type == 'Document') {
        let arr = returnData.values.arr;
        let documentIndex = returnData.values.documentIndex;
        arr.splice(documentIndex, 1);
        this.setDocumentActivitiesSortOrder(arr);
      } else if (returnData.values.type == 'Activity') {
        let sectionId = returnData.values.sectionId;
        let activityId = returnData.values.activityId;
        let index = returnData.values.index;
        if (activityId != 0) {
          this.lessonService.deleteActivity(sectionId, activityId)
            .then((res: any) => { })
            .catch((e) => { });
        }
        this.content.sections.forEach(sec => {
          if (sectionId == sec.id) {
            for (let i = 0; i < sec.activities.length; i++) {
              if (sec.activities[0].id == activityId || i == index) {
                sec.activities.splice(i, 1);
              }
            }
          }
        });
      }
    }
  }

  drop(activity, event: CdkDragDrop<string[]>) {
    moveItemInArray(activity.documentActivities, event.previousIndex, event.currentIndex);
    this.setDocumentActivitiesSortOrder(activity.documentActivities);
  }

  setDocumentActivitiesSortOrder(documentActivities) {
    // only set sort order corresponding with current index of the array,
    // then send to server only once
    for (let i = 0; i < documentActivities.length; i++) {
      let documentActivity = documentActivities[i];
      documentActivity.sortId = i;
    }
  }

  getActiveCssClassForLink(fileContent) {
    if (!fileContent) {
      return 'disabled';
    }
    return '';
  }

  onScroll() {
    this.setDocumentToDisplay();
  }

  isLastPage() {
    return this.currentPage * this.defaultPageSize > this.totalDocuments;
  }

  setDocumentToDisplay() {
    var gameTypeId = '1';
    if (this.documentTypeId == this.$DOCUMENT_FILE_TYPE.GAME) {
      if (this.filter.typeId == '0') {
        gameTypeId = null;
      } else {
        gameTypeId = this.filter.typeId;
      }
    } else {
      gameTypeId = null;
    }

    var name = '';
    if (this.filter.searchTerm) {
      name = this.filter.searchTerm;
    }

    let param = {
      name: this.filter.searchTerm,
      // only search document for lesson
      usageType: DOCUMENT_USAGE_TYPE.FOR_LESSON,
      documentTypeId: this.documentTypeId,
      gameTypeId: gameTypeId,
      page: this.currentPage + 1,
      pageSize: this.defaultPageSize,
    };

    this.documentService.getDocumentsForLibraryPagination(param).then((res: any) => {
      if (res.datas.length > 0) {
        this.documentList = this.documentList.concat(res.datas);
        this.currentPage = this.currentPage + 1;
      }
    });
  }

  resetFilter() {
    this.filter = this.getDefaultFilterValue();
  }

  getDefaultFilterValue() {
    return {
      typeId: '0',
      searchTerm: '',
    };
  }
  openPreviewDocumentModal = (document: any) => {
    this.documentView = document;
    this.isOpen = true;
    this.cd.detectChanges();
  };
  closeModal() {
    this.isOpen = false;
  }
  setInput(event) {
    if (event.file) this.fileInput = event.file.nativeElement;
    if (event.fileToUpload) {
      this.chooseDocuments(event.fileToUpload);
    }
  }

  removeActivity = (sectionId, activityId, index) => {

    var values = {
      sectionId, activityId, index, type: 'Activity'
    };

    let title = 'Xác nhận xoá';
    let text = 'Bạn có chắc chắn muốn xoá không?';
    this.openModal(values, title, text);

  }



  openInputDoc(obj: any) {
    this.currentDocAct = obj;
    this.fileInput.click();
  }
}
