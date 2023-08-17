import { AKITA_STORE } from '../../../../containers/constants/index';
import { Component, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { AuthService } from 'src/app/containers/services/auth/auth.service';
import { catchError, switchMap } from 'rxjs/operators';
import { UserService } from '../../../../containers/services/user.service';
import { OptionQuery } from 'src/app/store/option/optionQuery';
import { ROLE, generateCode, STATUSES, REGEX_PN } from 'src/app/containers/constants';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { FormCanDeactivate } from 'src/app/containers/guards/can-deactivate/can-deactivate';

@Component({
  selector: 'app-teacher-edit',
  templateUrl: './teacher-edit.component.html',
})
export class TeacherEditComponent extends FormCanDeactivate {
  isSubmitted: boolean;

  private TEACHER = 'users';
  VIETNAM_COUNTRY_CODE = 192;
  EMPTY_Teacher: any = {
    userName: '',
    phoneNumber: '',
    gender: 1,
    email: '',
    roleId: ROLE.TEACHER,
    nationalityId: this.VIETNAM_COUNTRY_CODE, // Vietnam
    dateStart: '',
    organId: 0,
    status: 1,
    address: '',
    code: '',
    dateOfBirth: '',
  };
  formGroup: FormGroup;
  status: any = STATUSES;
  isLoading = false;
  dateNow = Date.now();
  currentUser: any;
  id: number;
  teacher: any;
  ethnics: Array<any> = [];
  countries = [];
  errorMessage = '';

  constructor(
    private teachersService: UserService,
    private router: Router,
    private date: DatePipe,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    public optionQuery: OptionQuery,
    private toastr: ToastrService,
    private auth: AuthService,
    private route: ActivatedRoute
  ) {
    super();
    this.auth.currentUserSubject.asObservable().subscribe((res) => {
      this.currentUser = res;
    });
  }

  ngOnInit(): void {
    this.loadOption();
  }

  loadOption = () => {
    let options$ = this.optionQuery.selectAll();
    options$.subscribe((options) => {
      this.setInitialValues(options);
    });
  };

  setInitialValues = (options: any) => {
    if (options.length > 0) {
      this.countries = options[AKITA_STORE.COUNTRY];
      this.loadTeacher();
    }
  };

  loadTeacher() {
    const sb = this.route.paramMap
      .pipe(
        switchMap((params) => {
          this.id = Number(params.get('id'));
          if (this.id || this.id > 0) {
            return this.teachersService.getItemById(this.TEACHER, this.id);
          }
          return of(this.EMPTY_Teacher);
        }),
        catchError((errorMessage) => {
          this.errorMessage = errorMessage;
          return of(undefined);
        })
      )
      .subscribe((res: any) => {
        if (!res) {
          this.router.navigate(['/center-management/teachers'], { relativeTo: this.route });
        }
        this.teacher = res;
        if (!this.id) {
          this.getLastId();
        }

        if (!this.teacher.nationalityId) {
          this.teacher.nationalityId = this.VIETNAM_COUNTRY_CODE;
        }

        this.teacher.organId = this.currentUser.organization.id;
        this.loadForm();
      });
  }

  loadForm() {
    if (!this.teacher) {
      return;
    }
    this.formGroup = this.fb.group({
      userName: [this.teacher.userName, Validators.required],
      phoneNumber: [this.teacher.phoneNumber, Validators.compose([Validators.required, Validators.pattern(REGEX_PN)])],
      email: [this.teacher.email, Validators.compose([Validators.required, Validators.email])],
      roleId: [this.teacher?.roleId, Validators.required],
      dateOfBirth: [this.date.transform(this.teacher.dateOfBirth, 'yyyy-MM-dd')],
      gender: [this.teacher.gender, Validators.required],
      organId: [this.teacher.organId, Validators.required],
      // ethnicId: [this.teacher.ethnicId, Validators.required],
      nationalityId: [this.teacher.nationalityId, Validators.required],
      status: [this.teacher.status, Validators.required],
      code: [this.teacher.code, Validators.required],
      dateStart: [this.date.transform(this.teacher.dateStart, 'yyyy-MM-dd'), Validators.required],
      address: [this.teacher.address],
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
    this.isLoading = true;
    let textMess = (this.id ? 'Chỉnh sửa' : 'Thêm') + ' giáo viên';
    let model = { ...this.teacher, ...this.formGroup.value };
    model.age = this.getAge(model.dateOfBirth);
    this.teachersService
      .update(model)
      .then(() => {
        this.isLoading = false;
        this.router.navigate(['/center-management/teachers']);
        this.toastr.success('', textMess + ' thành công');
      })
      .catch((e) => {
        this.isSubmitted = false;
        if (e?.error?.message) {
          this.toastr.error('', e.error.message);
        } else {
          this.toastr.error('', textMess + ' thất bại');
        }
        this.isLoading = false;
        this.cd.detectChanges();
      });
  }
  getAge(birth) {
    let ageMS = Date.parse(Date()) - Date.parse(birth);
    let age = new Date();
    age.setTime(ageMS);
    let ageYear = age.getFullYear() - 1970;

    return ageYear;
  }
  getLastId() {
    this.teachersService
      .getLastId(this.TEACHER)
      .then((res: any) => {
        let code = generateCode(this.currentUser.organization.name.toUpperCase(), res + 1);
        this.formGroup.controls['code'].setValue(code);
        this.cd.detectChanges();
      })
      .catch((e) => {});
  }

  shouldDisableSaveButton() {
    return this.formGroup?.invalid || this.isLoading;
  }
}
