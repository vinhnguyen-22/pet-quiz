import { AKITA_STORE } from './../../../../containers/constants/index';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { OptionQuery } from 'src/app/store/option/optionQuery';
import { AuthService } from 'src/app/containers/services/auth/auth.service';
import { UserService } from 'src/app/containers/services/user.service';
import { REGEX_PN, STATUSES } from 'src/app/containers/constants';
import { ToastrService } from 'ngx-toastr';
import { FormCanDeactivate } from 'src/app/containers/guards/can-deactivate/can-deactivate';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
})
export class UserEditComponent extends FormCanDeactivate implements OnInit {
  isSubmitted: boolean;
  private USERS = 'users';
  id: number;
  EMPTY_USER = {
    userName: '',
    phoneNumber: '',
    gender: 1,
    email: '',
    roleId: '',
    gradeId: 0,
    organId: 0,
    status: 1,
    address: '',
    code: '',
  };
  user: any = {};
  formGroup: FormGroup;
  currentUser: any = {};
  roles: any = [];
  status: any = STATUSES;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    public optionQuery: OptionQuery,
    private router: Router,
    private auth: AuthService,
    private cd: ChangeDetectorRef,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) {
    super();
    this.auth.currentUserSubject.asObservable().subscribe((res) => (this.currentUser = res));
  }

  ngOnInit(): void {
    this.loadOption();
  }

  loadOption() {
    let options$ = this.optionQuery.selectAll();
    options$.subscribe((options: any) => {
      this.setInitialValues(options);
    });
  }

  setInitialValues = (options: any) => {
    if (options.length > 0) {
      let roles = options[AKITA_STORE.ROLE];
      this.roles = roles.filter((x: any) => x.id < 50);
      this.loadUser();
    }
  };

  loadUser() {
    this.route.paramMap
      .pipe(
        switchMap((params) => {
          this.id = Number(params.get('id'));
          if (this.id || this.id > 0) {
            return this.userService.getItemById(this.USERS, this.id);
          }
          return of(this.EMPTY_USER);
        }),
        catchError((errorMessage) => {
          this.errorMessage = errorMessage;
          return of(undefined);
        })
      )
      .subscribe((res: any) => {
        if (!res) {
          this.router.navigate(['/users'], { relativeTo: this.route });
        }
        this.user = { ...res };
        this.user.organId = this.currentUser?.organization?.id || 0;

        this.loadForm();
      });
  }
  loadForm() {
    if (!this.user) {
      return;
    }
    this.formGroup = this.fb.group({
      userName: [this.user.userName, Validators.required],
      phoneNumber: [this.user.phoneNumber, Validators.compose([Validators.required, Validators.pattern(REGEX_PN)])],
      email: [this.user.email, Validators.compose([Validators.required, Validators.email])],
      roleId: [this.user?.roleId, Validators.required],
      gender: [this.user.gender, Validators.required],
      organId: [this.user.organId, Validators.required],
      status: [this.user.status, Validators.required],
      code: [''],
    });
    this.cd.detectChanges();
  }
  isControlValid(controlName: string): boolean {
    const control = this.formGroup.controls[controlName];
    return control.valid && (control.dirty || control.touched);
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.formGroup.controls[controlName];
    return control.invalid && (control.dirty || control.touched);
  }

  controlHasError(validation: string, controlName: string) {
    const control = this.formGroup?.controls[controlName];
    return control.hasError(validation) && (control.dirty || control.touched);
  }

  save() {
    this.isSubmitted = true;
    let textMess = (this.id ? 'Chỉnh sửa' : 'Thêm') + ' nhân viên';
    this.userService
      .update({ ...this.user, ...this.formGroup.value })
      .then((res) => {
        this.router.navigate(['/users']);
        this.toastr.success('', textMess + ' thành công');
      })
      .catch((e) => {
        this.isSubmitted = false;
        this.toastr.error(e.error.Message);
        this.cd.detectChanges();
      });
  }
}
