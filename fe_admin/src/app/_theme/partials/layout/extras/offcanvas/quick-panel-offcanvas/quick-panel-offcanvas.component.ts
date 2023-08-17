import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ROLE } from './../../../../../../containers/constants/index';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/containers/services/auth/auth.service';
import { NotificationService } from 'src/app/containers/services/notification.service';
import { TicketService } from 'src/app/containers/services/ticket.service';
import { LayoutService } from '../../../../../core';
import { FeedbackService } from 'src/app/containers/services/feedback.service';
import { NewService } from 'src/app/containers/services/new.service';

@Component({
  selector: 'app-quick-panel-offcanvas',
  templateUrl: './quick-panel-offcanvas.component.html',
  styleUrls: ['./quick-panel-offcanvas.component.scss'],
})
export class QuickPanelOffcanvasComponent implements OnInit {
  @ViewChild('NOTIFY_DETAIL') NOTIFY_DETAIL: any;
  @ViewChild('headerNoti') headerNoti: any;
  extrasQuickPanelOffcanvasDirectionCSSClass = 'offcanvas-right';
  activeTabId = 'tickets';
  notifications: any = [];
  currentUser: any = {};
  role = ROLE;
  notify: any = {};
  tickets: any = [];
  feedbacks: any = [];
  notifyType = '';
  headerHeight = 0;
  constructor(
    private layout: LayoutService,
    public notificationService: NotificationService,
    public ticketService: TicketService,
    public feedbackService: FeedbackService,
    public newsService: NewService,
    public modalService: NgbModal,
    public auth: AuthService,
    private cd: ChangeDetectorRef
  ) {
    this.currentUser = this.auth.currentUserValue;
  }

  ngOnInit(): void {
    this.notificationService.resetNotiSubject();
    this.newsService.resetNewsSubject();
    this.ticketService.resetSupportTicketSubject();
    this.feedbackService.resetFeedbackSubject();
    
    this.extrasQuickPanelOffcanvasDirectionCSSClass = `offcanvas-${this.layout.getProp('extras.quickPanel.offcanvas.direction')}`;
    if (this.auth.canManageSystem()) {
      this.activeTabId = 'tickets';
    } else {
      this.activeTabId = 'notifications';
    }

    if (this.headerNoti) {
      this.headerHeight = this.headerNoti.nativeElement.height;
    }
  }

  setActiveTabId(tabId) {
    this.activeTabId = tabId;
  }

  getActiveCSSClasses(tabId) {
    if (tabId !== this.activeTabId) {
      return '';
    }
    return 'active show';
  }

  showContent(data, type) {
    this.notify = data;
    this.notifyType = type;
    switch (type) {
      case 'TICKET':
        this.markSupportTicketAsRead(data);
        break;

      case 'NOTIFICATION':
        this.markAnnoucementAsRead(data);
        break;

      case 'FEED_BACK':
        this.markFeedbackAsRead(data);
        break;

      case 'NEWS':
        this.markNewsAsRead(data);
        break;
        
      default:
        break;
    }

    this.modalService.open(this.NOTIFY_DETAIL, {
      size: 'lg',
    });
  }

  markSupportTicketAsRead(supportTicket) {
    var param = {
      supportTicketIds: [supportTicket.id]
    };

    this.ticketService.markSupportTicketsAsRead(param).then((res) => {
      var pagingParam = {
        page: 1,
        pageSize: 1000
      }

      this.ticketService.getAllUnread(pagingParam).subscribe((res:any) => {
        this.cd.detectChanges();
      });
    });
  }

  markAnnoucementAsRead(annoucement) {
    var param = {
      notificationIds: [annoucement.id]
    };

    
    this.notificationService.markNotificationsAsRead(param).then((res) => {
      var pagingParam = {
        page: 1,
        pageSize: 1000
      }

      this.notificationService.getAllUnread(pagingParam).subscribe((res:any) => {
        this.cd.detectChanges();
      });
    });
  }

  markFeedbackAsRead(feedback) {
    var param = {
      feedbackIds: [feedback.id]
    };

    this.feedbackService.markFeedbacksAsRead(param).then((res) => {
      var pagingParam = {
        page: 1,
        pageSize: 1000
      }

      this.feedbackService.getAllUnread(pagingParam).subscribe((res:any) => {
        this.cd.detectChanges();
      });
    });
  }

  markNewsAsRead(news) {
    var param = {
      newsId: [news.id]
    };
    this.newsService.markNewsAsRead(param).then((res) => {
      var pagingParam = {
        page: 1,
        pageSize: 1000
      }
      this.newsService.getAllUnread(pagingParam).subscribe((res:any) => {
        this.cd.detectChanges();
      });
    });
  }
}
