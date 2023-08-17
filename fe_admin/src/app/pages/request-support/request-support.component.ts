import { AKITA_STORE } from '../../containers/constants/index';
// tslint:disable:no-string-literal
import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/containers/services/auth/auth.service';
import { OrganizationService } from 'src/app/containers/services/organization.service';
import { OptionQuery } from 'src/app/store/option/optionQuery';
import { TicketService } from 'src/app/containers/services/ticket.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ShareService } from 'src/app/containers/services/share/share.service';
@Component({
  selector: 'request-support',
  templateUrl: './request-support.component.html',
})
export class RequestSupportComponent {
  API_ENDPOINT = 'tickets/get';
  @ViewChild('RequestSupport') RequestSupport: any;
  currentUser: any;
  ticketrs: any = {};
  isLoading: boolean;
  filterGroup: FormGroup;
  searchGroup: FormGroup;
  organizations: any = [];
  roles: any = [];
  categories: any = [];
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
        width: '8%',
      },
      {
        key: 'organName',
        value: 'Tổ chức',
        width: '8%',
      },
      {
        key: 'phoneNumber',
        value: 'Số điện thoại',
        width: '10%',
      },
      {
        key: 'roleName',
        value: 'Vai trò',
        width: '10%',
      },
      {
        key: 'category',
        value: 'Vấn đề cần hỗ trợ',
        width: '10%',
      },
      {
        key: 'createdDate',
        value: 'Ngày tạo',
        width: '10%',
        type: 'day-time',
      },
      {
        key: 'status',
        value: 'Trạng thái',
        width: '10%',
        type: 'ticket',
      },
    ],
  };

  filter: any = {
    category: '',
    organId: 0,
    roleId: 0,
    isUnread: 0,
  };
  private subscriptions: Subscription[] = [];

  constructor(
    private organService: OrganizationService,
    private optionQuery: OptionQuery,
    private ticketService: TicketService,
    private auth: AuthService,
    public modalService: NgbModal,
    private cd: ChangeDetectorRef,
    public sharedService: ShareService
  ) {
    this.auth.currentUserSubject.asObservable().subscribe((res) => (this.currentUser = res));
  }

  ngOnInit(): void {
    this.getAll();
    this.getAllOrgan();
    this.loadOption();
  }

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

  loadOption() {
    let options$ = this.optionQuery.selectAll();
    options$.subscribe((options) => {
      this.setInitialValues(options);
    });
  }

  setInitialValues = (options: any) => {
    if (options.length > 0) {
      this.roles = options[AKITA_STORE.ROLE].filter((r: any) => r.id == 50 || r.id == 51 || r.id == 52 || r.id == 53);
      this.categories = options[AKITA_STORE.TICKET_TYPE];
      this.cd.detectChanges();
    }
  };

  getAll = () => {
    this.ticketService
      .get(this.filter)
      .then((res: any) => {
        this.objectDataTable.datas = res.map((r: any, i: any) => {
          return {
            id: r.id,
            stt: i + 1,
            content: r.content,
            organName: r.organName,
            phoneNumber: r.sender.phoneNumber,
            status: r.status,
            category: r.category,
            createdDate: r.createdDate,
            senderName: r.sender.userName,
            roleName: r.sender?.role?.name,
            files: r.files,
          };
        });
        this.cd.detectChanges();
      })
      .catch((e: any) => { });
  };

  changeFilter = () => {
    this.getAll();
  };

  updateStatus = () => {
    this.ticketService
      .updateStatus(this.ticketrs.id)
      .then((res: any) => {
        this.getAll();
        this.modalService.dismissAll();
      })
      .catch((err: any) => { });
  };
  openModal = (n: any) => {
    this.ticketrs = n;
    this.modalService.open(this.RequestSupport, {
      size: 'lg',
    });
  };
  ngOnDestroy() {
    this.subscriptions.forEach((sb) => sb.unsubscribe());
  }
}
