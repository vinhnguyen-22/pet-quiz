import { AKITA_STORE } from './../../containers/constants/index';
import { ToastrService } from 'ngx-toastr';
import { ChangeDetectorRef, Component } from '@angular/core';
import { AuthService } from 'src/app/containers/services/auth/auth.service';
import { OptionQuery } from 'src/app/store/option/optionQuery';
import { FeedbackService } from 'src/app/containers/services/feedback.service';
import { FormCanDeactivate } from 'src/app/containers/guards/can-deactivate/can-deactivate';

@Component({
  selector: 'app-send-fb-list',
  templateUrl: './send-fb.component.html',
})
export class SendFBComponent extends FormCanDeactivate {
  isSubmitted: boolean;
  API_ENDPOINT = 'tickets/get';
  feedBack: any = {
    content: '',
    userId: 0,
    category: '',
  };
  currentUser: any = {};
  categories: any = [];
  constructor(
    private optionQuery: OptionQuery,
    private toastr: ToastrService,
    private feedbackService: FeedbackService,
    private auth: AuthService,
    private cd: ChangeDetectorRef
  ) {
    super();
    this.auth.currentUserSubject.asObservable().subscribe((res) => {
      this.currentUser = res;
      this.feedBack.userId = this.currentUser.id;
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
      this.categories = options[AKITA_STORE.FEEDBACK_TYPE];
      this.feedBack.category = this.categories[0];
      this.cd.detectChanges();
    }
  };

  sendFeedBack = (event: any) => {
    this.isSubmitted = true;
    this.feedbackService
      .create(this.feedBack)
      .then((res: any) => {
        this.feedBack = { ...this.feedBack, content: '', category: this.categories[0] };
        this.toastr.success('', 'Gửi ý kiến đóng góp thành công');
        this.cd.detectChanges();
      })
      .catch(() => {
        this.isSubmitted = false;
        this.toastr.error('', 'Gửi ý kiến đóng góp thất bại');
      });
  };
}
