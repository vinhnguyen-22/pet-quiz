import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/containers/services/auth/auth.service';
import { CustomModalService } from 'src/app/containers/services/modal.service';
import { NewService } from 'src/app/containers/services/new.service';
@Component({
  selector: 'app-new-list',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
})
export class NewComponent {
  news: any = [];
  currentUser: any = {};
  new: any = {};
  @ViewChild('New') New: any;
  constructor(
    public newService: NewService,
    private cd: ChangeDetectorRef,
    private auth: AuthService,
    public modalService: NgbModal,
    public modal: CustomModalService
  ) {
    this.auth.currentUserSubject.asObservable().subscribe((res) => (this.currentUser = res));
  }

  ngOnInit(): void {
    this.getNews();
  }
  getNews = () => {
    let params = {
      page: 1,
      pageSize: 1000,
    };
    this.newService
      .getNewsForCurrentUser(params)
      .then((res: any) => {
        this.news = res.datas;
        this.cd.detectChanges();
      })
      .catch((e) => { });
  };
  openNew = (n: any) => {
    this.new = n;

    this.modal.Dialog('new', true, n);
  };
}
