import { AKITA_STORE } from './../../containers/constants/index';
import { ToastrService } from 'ngx-toastr';
import { ChangeDetectorRef, Component } from '@angular/core';
import { AuthService } from 'src/app/containers/services/auth/auth.service';
import { OptionQuery } from 'src/app/store/option/optionQuery';
import { TicketService } from 'src/app/containers/services/ticket.service';
import { FormCanDeactivate } from 'src/app/containers/guards/can-deactivate/can-deactivate';

@Component({
  selector: 'app-send-rs',
  templateUrl: './send-rs.component.html',
})
export class SendRSComponent extends FormCanDeactivate {
  isSubmitted: boolean;

  API_ENDPOINT = 'tickets/get';
  request: any = {
    content: '',
    userId: 0,
    category: '',
    files: '',
  };
  currentUser: any = {};
  categories: any = [];
  constructor(
    private optionQuery: OptionQuery,
    private toastr: ToastrService,
    private ticketService: TicketService,
    private auth: AuthService,
    private cd: ChangeDetectorRef
  ) {
    super();
    this.auth.currentUserSubject.asObservable().subscribe((res) => {
      this.currentUser = res;
      this.request.userId = this.currentUser.id;
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
      this.categories = options[AKITA_STORE.TICKET_TYPE];
      this.request.category = this.categories[0];
      this.cd.detectChanges();
    }
  };

  sendRequest = (event: any) => {
    this.isSubmitted = true;
    this.ticketService
      .create(this.request)
      .then((res: any) => {
        this.request = { ...this.request, content: '', category: this.categories[0] };
        this.toastr.success('', 'Gửi yêu cầu hỗ trợ thành công');
        this.cd.detectChanges();
      })
      .catch(() => {
        this.isSubmitted = false;
        this.toastr.error('', 'Gửi yêu cầu hỗ trợ thất bại');
      });
  };
}
