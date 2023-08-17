import { AKITA_STORE } from '../../containers/constants/index';
import { ChangeDetectorRef, Component } from '@angular/core';
import { AuthService } from 'src/app/containers/services/auth/auth.service';
import { OptionQuery } from 'src/app/store/option/optionQuery';
import { OrganizationService } from 'src/app/containers/services/organization.service';
import { FeedbackService } from 'src/app/containers/services/feedback.service';
import { LocalStorageService } from 'src/app/containers/services/storage/local-storage.service';
import { Router } from '@angular/router';
import { ShareService } from 'src/app/containers/services/share/share.service';

@Component({
  selector: 'app-feedback-list',
  templateUrl: './feedbacks.component.html',
})
export class FeedbacksComponent {
  loading = false;
  currentUser: any = {};
  isShowModalDetail = false;
  categories: any;
  organizations: any = [];
  roles: any = [];
  filter: any = {
    category: '',
    roleId: 0,
    organId: 0,
    domain: 'CMS',
  };
  feedback: any = {};
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
        key: 'stt',
        value: 'STT',
        width: '5%',
      },
      {
        key: 'senderName',
        value: 'Người gửi',
        width: '12%',
      },
      {
        key: 'organName',
        value: 'Tổ chức',
        width: '12%',
      },
      {
        key: 'phoneNumber',
        value: 'Số điện thoại',
        width: '12%',
      },
      {
        key: 'category',
        value: 'Danh mục',
        width: '14%',
      },
      {
        key: 'createdDate',
        value: 'Ngày tạo',
        width: '10%',
        type: 'day-time',
      },
      {
        key: 'content',
        value: 'Nội dung',
        width: '',
      },
    ],
  };

  constructor(
    public router: Router,
    public cookieService: LocalStorageService,
    public feedbackService: FeedbackService,
    public organService: OrganizationService,
    private authService: AuthService,
    private cd: ChangeDetectorRef,
    public optionQuery: OptionQuery,
    public sharedService: ShareService
  ) {
    this.currentUser = this.authService.currentUserValue;
    this.filter.roleId = this.currentUser?.roleId;
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
      this.roles = options[AKITA_STORE.ROLE].filter((r: any) => r.id == 51 || r.id == 52);
      this.categories = options[AKITA_STORE.FEEDBACK_TYPE];
      this.getAll();
      this.getAllOrgan();
    }
  };
  getAllOrgan = () => {
    let organId = this.currentUser.organization.id;
    this.organService
      .getOrganizations(organId)
      .then((res: any) => {
        this.organizations = res;
        this.cd.detectChanges();
      })
      .catch();
  };

  getAll = () => {
    this.loading = true;
    this.feedbackService
      .get(this.filter)
      .then((res: any) => {
        this.objectDataTable.datas = [];
        if (res.length > 0) {
          let i = 0;
          res.forEach((feedback: any) => {
            i += 1;
            this.objectDataTable.datas.push({
              id: feedback.id,
              stt: i,
              content: feedback.content,
              organName: feedback.organName,
              phoneNumber: feedback.sender.phoneNumber,
              category: feedback.category,
              createdDate: feedback.createdDate,
              senderName: feedback.sender.userName,
            });
          });
        }
        this.loading = false;
        this.cd.detectChanges();
      })
      .catch((e: any) => {});
  };

  actions = (action: any) => {
    if (action.actionName == 'detail') {
      this.objectDataTable.datas.forEach((feedback: any) => {
        if (feedback.id == action.idSelected) {
          this.feedback = feedback;
        }
      });
      this.isShowModalDetail = !this.isShowModalDetail;
    }
  };

  changeFilter = () => {
    this.getAll();
  };

  closeModalDetail = () => {
    this.isShowModalDetail = false;
  };
}
