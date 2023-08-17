import { ChangeDetectorRef, Component } from '@angular/core';
import { NotificationService } from 'src/app/containers/services/notification.service';
import { AuthService } from 'src/app/containers/services/auth/auth.service';
import { ShareService } from 'src/app/containers/services/share/share.service';
import { Router } from '@angular/router';
import { ROLE } from 'src/app/containers/constants';

@Component({
  selector: 'app-notification-list',
  templateUrl: './list.component.html',
})
export class NotificationListComponent {
  currentUser: any;

  notifications: any = [];
  constructor(
    public notificationService: NotificationService,
    private auth: AuthService,
    private cd: ChangeDetectorRef,
    public sharedService: ShareService,
    private router: Router
  ) {
    this.auth.currentUserSubject
      .asObservable()
      .subscribe((res) => (this.currentUser = res));
  }

  ngOnInit(): void {
    this.getNotifications();
  }

  getNotifications() {
    var data = {
      page: 1,
      pageSize: 1000
    };

    this.notificationService
      .getNotificationsManagedByCurrentUser(data)
      .then((res: any) => {
        this.notifications = res.datas;
        this.cd.detectChanges();
      })
      .catch((e) => {});
  }

  goToNotificationEditPage() {
    this.router.navigate(['notifications/organization-edit']);
  }
}
