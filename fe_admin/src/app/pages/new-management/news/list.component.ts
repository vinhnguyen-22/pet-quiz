import { AKITA_STORE, ROLE } from './../../../containers/constants/index';
import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/containers/services/auth/auth.service';
import { NewService } from 'src/app/containers/services/new.service';
import { CommonModalComponent } from 'src/app/modules/SharedModule/modal/modal.component';
import { OptionQuery } from 'src/app/store/option/optionQuery';
import { ShareService } from 'src/app/containers/services/share/share.service';
import { CustomModalService } from 'src/app/containers/services/modal.service';

@Component({
  selector: 'app-new-list',
  templateUrl: './list.component.html',
})
export class NewListComponent {
  @ViewChild('confirmationModal')
  private modalComponent!: CommonModalComponent;
  currentUser: any;
  filter: any = {
    organId: 0,
    pageIndex: 1,
    pageSize: 2000,
    category: '0',
  };
  news: any = [];
  new: any = {};
  categories: any = [];

  constructor(
    public newService: NewService,
    public auth: AuthService,
    private newsService: NewService,
    private optionQuery: OptionQuery,
    private cd: ChangeDetectorRef,
    public modalService: NgbModal,
    public sharedService: ShareService,
    public modal: CustomModalService
  ) {
    this.auth.currentUserSubject.asObservable().subscribe((res) => (this.currentUser = res));
  }

  ngOnInit(): void {
    this.getNews();
    this.loadOption();
  }

  categoryChanged() {
    this.getNews();
  }

  loadOption() {
    let options$ = this.optionQuery.selectAll();
    options$.subscribe((options) => {
      this.setInitialValues(options);
    });
  }

  setInitialValues = (options: any) => {
    if (options.length > 0) {
      this.categories = options[AKITA_STORE.NEW_TYPE];
      this.cd.detectChanges();
    }
  };

  getNews() {
    this.newService
      .getNewsManagedByCurrentUser(this.filter)
      .then((res: any) => {
        this.news = res.datas;
        this.cd.detectChanges();
      })
      .catch((e) => {});
  }

  openNew = (n: any) => {
    this.new = n;
    this.modal.Dialog('new', true, n);
  };

  remove(news: any) {
    let values = {
      newsId: news.id,
    };
    this.openRemoveGameConfirmationModal(values, 'Xoá tin tức', 'Bạn có muốn xoá tin tức này không?');
  }

  getConfirmationValue($event) {
    let returnData = $event;

    if (returnData.result == 'Confirm') {
      let newsId = returnData.values.newsId;
      this.newsService
        .remove(newsId)
        .then((res: any) => {
          this.getNews();
        })
        .catch((e) => {});
    }
  }

  async openRemoveGameConfirmationModal(values, title: string, text: string) {
    return await this.modalComponent.openDeleteConfirmationModal(values, title, text);
  }
}
