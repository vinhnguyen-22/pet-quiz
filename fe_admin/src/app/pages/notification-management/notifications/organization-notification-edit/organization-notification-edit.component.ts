import { OrganizationService } from 'src/app/containers/services/organization.service';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of, Subscription } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/containers/services/auth/auth.service';
import { NotificationService } from 'src/app/containers/services/notification.service';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ToastrService } from 'ngx-toastr';
import { FormCanDeactivate } from 'src/app/containers/guards/can-deactivate/can-deactivate';
import { ClassService } from 'src/app/containers/services/class.service';
import { CENTER_TYPE, ROLE, SCHOOL_TYPE } from 'src/app/containers/constants';

@Component({
  selector: 'app-organization-notification-edit',
  templateUrl: './organization-notification-edit.component.html',
})
export class OrganizationNotificationEditComponent extends FormCanDeactivate implements OnInit, OnDestroy {
  isSubmitted: boolean;

  private currentUser: any = {};
  public Editor = ClassicEditor;
  id: number;
  EMPTY_NOTIFICATION: any = {
    id: 0,
    title: '',
    content: '',
    fromOrganId: 0,
    status: 1,
    toOrganId: 0,
    toOrganType: 0,
    toClassId: 0,
  };
  notification: any;
  managedSchools: any = [];

  // for admin / customer care only
  managedOrganizations: any = [];
  // managed class for english center
  managedClasses: any = [];

  // classes of school
  classes: any = [];
  DEFAULT_SCHOOL_ID = 0;
  DEFAULT_CLASS_ID = 0;
  // currentSchoolId: any;

  formGroup: FormGroup;
  isLoading$: Observable<boolean>;
  errorMessage = '';

  $ROLE = ROLE;
  $SCHOOL_TYPE = SCHOOL_TYPE;
  $CENTER_TYPE = CENTER_TYPE;
  private subscriptions: Subscription[] = [];

  constructor(
    private notificationService: NotificationService,
    private classService: ClassService,
    private router: Router,
    private organizationService: OrganizationService,
    private toastr: ToastrService,
    private authService: AuthService,
    private cd: ChangeDetectorRef,
    private route: ActivatedRoute
  ) {
    super();
    this.currentUser = this.authService.currentUserValue;
  }

  ngOnInit(): void {
    this.loadNotification();

    if (this.isEnglishCenter()) {
      this.getManagedSchools();
    } else if (this.isManagingSystem()) {

    } else {
      this.getClassesByCurrentOrganizationOfUser();
    }
  }

  loadNotification() {
    const sb = this.route.paramMap
      .pipe(
        switchMap((params) => {
          this.id = Number(params.get('id'));
          if (this.id || this.id > 0) {
            return this.notificationService.getItemById(this.id);
          }
          return of({ ...this.EMPTY_NOTIFICATION });
        }),
        catchError((errorMessage) => {
          this.errorMessage = errorMessage;
          return of(undefined);
        })
      )
      .subscribe((res: any) => {
        if (!res) {
          this.router.navigate(['/notifications'], { relativeTo: this.route });
        }
        this.notification = res;
        this.changeDestinationOrganization(this.notification.toOrganType.toString());
        this.cd.detectChanges();
      });
    this.subscriptions.push(sb);
  }

  getManagedEnglishCenters = () => {
    this.organizationService.getManagedEnglishCenters()
      .then((res: any) => {
        this.managedOrganizations = res;

        this.cd.detectChanges();
      })
      .catch((e: any) => { });
  }

  getManagedSchools = () => {
    this.organizationService
      .getOrganizations(this.currentUser.organization.id)
      .then((res: any) => {
        this.managedSchools = res;
        this.managedOrganizations = res;
        this.cd.detectChanges();

        if (!this.isManagingSystem()) {
          if (!this.notification) {
            this.getManagedClasses(this.DEFAULT_SCHOOL_ID);
          } else {
            this.getManagedClasses(this.notification.toOrganId);
          }
        }
      })
      .catch((e: any) => { });
  };

  getManagedClasses = (schoolId) => {
    if (schoolId == this.DEFAULT_SCHOOL_ID) {
      schoolId = null;
    }

    this.classService
      .getManagedClassesBySchoolId(schoolId)
      .then((res: any) => {
        this.managedClasses = res;

        this.cd.detectChanges();
      })
      .catch((e: any) => { });
  };

  getClassesByCurrentOrganizationOfUser() {
    this.classService
      .getByCurrentOrganizationOfUser()
      .then((res: any) => {
        this.classes = res;

        this.cd.detectChanges();
      })
      .catch((e: any) => { });
  }

  organizationChanged($event) {
    var schoolId = $event.target.value;
    this.getManagedClasses(schoolId);
  }

  changeDestinationSubject($event) {
    var destinationSubjectType = $event.target.value;

    this.changeDestinationOrganization(destinationSubjectType);
  }

  changeDestinationOrganization(destinationSubjectType) {
    switch (destinationSubjectType) {
      case "0":
        // all
        this.managedOrganizations = [];
        break;

      case this.$SCHOOL_TYPE.toString():
        // choose school
        this.getManagedSchools();
        break;

      case this.$CENTER_TYPE.toString():
        // choose english center
        this.getManagedEnglishCenters();
        break;

      default:
        break;
    }
  }

  save() {
    this.isSubmitted = true;
    this.notification.fromOrganId = this.currentUser.organization.id;
    let textMess = (this.id ? 'Chỉnh sửa' : 'Thêm') + ' thông báo';

    this.notificationService
      .update(this.notification)
      .then((res: any) => {
        this.router.navigate(['/notifications']);
        this.toastr.success('', textMess + ' thành công');
      })
      .catch((e) => {
        this.isSubmitted = false;
        this.toastr.error('', textMess + ' thất bại');
        this.cd.detectChanges();
      });
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sb) => sb.unsubscribe());
  }

  isEnglishCenter() {
    return this.currentUser?.roleId == ROLE.CENTER;
  }

  isManagingSystem() {
    return this.authService.isAdmin() || this.currentUser?.roleId == ROLE.CUSTOMER_CARE;
  }

  isSchoolAdmin() {
    return this.currentUser?.roleId == ROLE.ADMIN_SCHOOL;
  }

  shouldDisableDropdown() {
    if (!this.notification.id || this.notification.id == 0) {
      return null;
    }

    return true;
  }
}
