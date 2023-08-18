import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ROLE } from '../../../../../../../constants/index';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/services/auth/auth.service';
import { LayoutService } from '../../../../../core';

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
  constructor(private layout: LayoutService, public modalService: NgbModal, public auth: AuthService, private cd: ChangeDetectorRef) {
    this.currentUser = this.auth.currentUserValue;
  }

  ngOnInit(): void {
    this.extrasQuickPanelOffcanvasDirectionCSSClass = `offcanvas-${this.layout.getProp('extras.quickPanel.offcanvas.direction')}`;
    this.activeTabId = 'notifications';

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
      supportTicketIds: [supportTicket.id],
    };
  }

  markAnnoucementAsRead(annoucement) {
    var param = {
      notificationIds: [annoucement.id],
    };
  }

  markFeedbackAsRead(feedback) {
    var param = {
      feedbackIds: [feedback.id],
    };
  }

  markNewsAsRead(news) {}
}
