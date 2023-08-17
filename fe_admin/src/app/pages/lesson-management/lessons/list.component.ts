import { LESSON_PER_WEEK, AKITA_STORE, HTTP_RESPONSE_TYPE, GENERAL_ERROR_MESSAGE, ROLE } from './../../../containers/constants/index';
import { ChangeDetectorRef, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { LessonService } from 'src/app/containers/services/lesson.service';
import { OptionQuery } from 'src/app/store/option/optionQuery';
import { AuthService } from 'src/app/containers/services/auth/auth.service';
import { TopicService } from 'src/app/containers/services/topic.service';
import { ShareService } from 'src/app/containers/services/share/share.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModalComponent } from 'src/app/modules/SharedModule/modal/modal.component';
import { SessionStorageService } from 'src/app/containers/services/storage/session-storage.service';

@Component({
  selector: 'app-lesson-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class LessonListComponent implements OnInit {
  @ViewChild('confirmationModal')
  private modalComponent!: CommonModalComponent;

  END_POINT_TOPIC = 'topics';
  currentUser: any;
  lessons: any = [];

  gradeIdKey = 'lessonlist_gradeid';
  topicIdKey = 'lessonlist_topicid';

  DEFAULT_GRADE_ID = 0; // All
  DEFAULT_TOPIC_ID = 0; // All
  filter: any = {
    gradeId: this.DEFAULT_GRADE_ID,
    topicId: this.DEFAULT_TOPIC_ID,
    searchTerm: '',
  };
  grades: any = [];
  topics: any = [];
  isLoading = false;
  lessonPerWeek: any = LESSON_PER_WEEK;
  objectDataTable: any = {
    datas: [],
    actions: [
      {
        key: 'detail',
        value: 'Xem chi tiết',
      },
    ],
    headers: [
      {
        key: 'gradeName',
        value: 'Level',
        width: '7%',
      },
      {
        key: 'topicName',
        value: 'Chủ đề',
        width: '8%',
      },
      {
        key: 'name',
        value: 'Tên bài học',
        width: '10%',
      },
      {
        key: 'programName',
        value: 'Chương trình',
        width: '10%',
      },
      {
        key: 'lastModifiedByUser.userName',
        value: 'Cập nhật gần nhất bởi',
        width: '13%',
      },
      {
        key: 'lastModifiedDate',
        value: 'Thời gian',
        width: '15%',
      },
      {
        key: 'status',
        value: 'Trạng thái',
        width: '10%',
      },
    ],
  };

  private subscriptions: Subscription[] = [];
  constructor(
    private optionQuery: OptionQuery,
    private cd: ChangeDetectorRef,
    public lessonService: LessonService,
    private topicService: TopicService,
    private shareService: ShareService,
    private toastr: ToastrService,
    public auth: AuthService,
    public sharedService: ShareService,
    private sessionStorageService: SessionStorageService
  ) {
    this.auth.currentUserSubject.asObservable().subscribe((res) => (this.currentUser = res));
  }

  getSelectedGradeId() {
    return this.sessionStorageService.get(this.gradeIdKey);
  }

  setSelectedGradeId(gradeId) {
    this.sessionStorageService.set(this.gradeIdKey, gradeId);
  }

  getSelectedTopicId() {
    return this.sessionStorageService.get(this.topicIdKey);
  }

  setSelectedTopicId(topicId) {
    this.sessionStorageService.set(this.topicIdKey, topicId);
  }

  ngOnInit(): void {
    this.loadOption();
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sb) => sb.unsubscribe());
  }

  loadOption() {
    let options$ = this.optionQuery.selectAll();
    options$.subscribe((options) => {
      this.setInitialValues(options);
    });
  }

  setInitialValues = (options: any) => {
    if (options.length > 0) {
      this.grades = options[AKITA_STORE.GRADE];

      var selectedGradeId = this.getSelectedGradeId();
      if (selectedGradeId == null) {
        // if there is no previous configuration
        // then save default value and set default value for filter
        this.setSelectedGradeId(this.DEFAULT_GRADE_ID);

        this.filter.gradeId = this.DEFAULT_GRADE_ID;
      } else {
        // get selected value from session storage then assign it to filter
        this.filter.gradeId = selectedGradeId;
      }

      this.cd.detectChanges();
      this.getTopicByGrade();
    }
  };

  getLessons() {
    this.isLoading = true;
    this.lessonService
      .get(this.filter)
      .then((res: any) => {
        this.lessons = res;
        this.isLoading = false;
        this.cd.detectChanges();
      })
      .catch((e) => { });
  }

  filterChanged() {
    this.setSelectedTopicId(this.filter.topicId);
    this.getLessons();
  }

  getTopicByGrade() {
    this.topicService
      .getByModel(this.END_POINT_TOPIC, { searchTerm: '', gradeId: this.filter.gradeId })
      .then((res: any) => {
        this.topics = res;

        var selectedTopicId = this.getSelectedTopicId();
        if (selectedTopicId == null) {
          // if there is no previous configuration
          // then save default value and set default value for filter
          this.setSelectedTopicId(this.DEFAULT_TOPIC_ID);

          this.filter.topicId = this.DEFAULT_TOPIC_ID;
        } else {
          // get selected value from session storage then assign it to filter
          this.filter.topicId = selectedTopicId;
        }

        this.cd.detectChanges();
        this.getLessons();
      })
      .catch((e) => { });
  }

  changeGrade() {
    this.setSelectedGradeId(this.filter.gradeId);
    this.setSelectedTopicId(this.DEFAULT_TOPIC_ID);
    this.getTopicByGrade();
  }

  uploadLesson(event) {
    var file = event.target.files[0];
    let formData = new FormData();
    formData.append('upload', file);
    this.shareService.uploadExcel(formData, 'lesson').subscribe(
      (res) => {
        this.getLessons();
        this.toastr.success('', 'Upload bài học thành công');
      },
      (err) => {
        alert(err.error);
        window.location.reload();
      }
    );
  }

  removeLesson(lesson) {
    var values = {
      lessonId: lesson.id,
    };

    let title = 'Xác nhận xoá bài học';
    let text = 'Bạn có chắc chắn muốn xoá bài học "' + lesson.name + '" không?';

    this.openModal(values, title, text);
  }

  getConfirmationValue($event) {
    let returnData = $event;
    if (returnData.result == 'Confirm') {
      var lessonId = returnData.values.lessonId;
      this.lessonService
        .delete(lessonId)
        .then((res: any) => {
          if (res) {
            this.getLessons();
            this.toastr.success('', res.message);
          }
        })
        .catch((err) => {
          this.toastr.error('', 'Có lỗi xảy ra khi xoá bài học.');
          this.cd.detectChanges();
        });
    }
  }

  changeStatus(lesson) {
    this.lessonService
      .changeStatus(lesson)
      .then((res: any) => {
        this.lessons.map((x) => {
          if (x.id == lesson.id) {
            x.status = res.status;
          }
          return x;
        });
      })
      .catch((err) => { });
  }

  async openModal(values, title: string, text: string) {
    return await this.modalComponent.openDeleteConfirmationModal(values, title, text);
  }
}
