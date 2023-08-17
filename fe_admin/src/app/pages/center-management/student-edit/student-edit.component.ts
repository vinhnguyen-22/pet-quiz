import { AKITA_STORE, GENERAL_ERROR_MESSAGE, HTTP_RESPONSE_TYPE } from '../../../containers/constants/index';
import { Component, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { REGEX_PN } from 'src/app/containers/constants';
import { AuthService } from 'src/app/containers/services/auth/auth.service';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { OptionQuery } from 'src/app/store/option/optionQuery';
import { StudentService } from 'src/app/containers/services/student.service';
import { ClassService } from 'src/app/containers/services/class.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { DistrictService } from 'src/app/containers/services/district.service';
import { WardService } from 'src/app/containers/services/ward.service';
import { FormCanDeactivate } from 'src/app/containers/guards/can-deactivate/can-deactivate';

@Component({
  selector: 'app-student-edit',
  templateUrl: './student-edit.component.html',
})
export class StudentEditComponent extends FormCanDeactivate {
  isSubmitted: boolean;

  @ViewChild('wizard', { static: true }) el: ElementRef;
  Editor = ClassicEditor;
  private STUDENT = 'students';
  wizard: any;
  submitted = false;
  id: number;
  EMPTY_STUDENT: any = {
    student: {
      id: 0,
      address: '',
      avatar: '',
      code: '',
      name: '',
      gender: 'true',
      ethnicId: 0,
      provinceCode: 0,
      districtCode: 0,
      wardCode: 0,
      dob: new Date(Date.now() - 86400000),
      notes: '',
    },
    parentInfo: {
      id: 0,
      name: '',
      phoneNumber: '',
      address: '',
      job: '',
      dob: new Date(Date.now() - 86400000),
      organizationId: 0,
    },
    classInfo: {
      id: 0,
      yearId: 0,
      classId: 0,
      gradeId: 0,
      dateOfEnter: new Date(),
    },
  };
  studentForm: FormGroup;
  maxDay = new Date(Date.now() - 86400000);
  dateNow = new Date();
  typeOr: number = 0;
  lastStudentId: any = 0;
  years: Array<any> = [];
  options: Array<any> = [];
  grades: Array<any> = [];
  provinces: Array<any> = [];
  districts: Array<any> = [];
  wards: Array<any> = [];
  studentDetail: any = this.EMPTY_STUDENT;
  currentUser: any;
  list: any = [];
  errorMessage = '';
  filterClass = {
    gradeId: 0,
    name: '',
    organId: 0,
    roleId: 0,
    teacherId: 0,
    yearId: 0,
  };
  classId: any;
  constructor(
    public optionQuery: OptionQuery,
    private router: Router,
    private date: DatePipe,
    private toastr: ToastrService,
    private fb: FormBuilder,
    public classService: ClassService,
    private studentService: StudentService,
    private auth: AuthService,
    private cd: ChangeDetectorRef,
    private route: ActivatedRoute,
    private districtService: DistrictService,
    private wardService: WardService
  ) {
    super();
    this.auth.currentUserSubject.asObservable().subscribe((res) => {
      this.currentUser = res;
      this.typeOr = this.currentUser.organization.type;
      this.classId = this.router.getCurrentNavigation().extras?.state?.classId;
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
      this.options = options;
      let years = [...options[AKITA_STORE.YEAR]];
      this.years = years.reverse();
      this.grades = options[AKITA_STORE.GRADE];
      this.provinces = options[AKITA_STORE.PROVINCE];
      this.loadStudent();
    }
  };
  loadStudent() {
    const sb = this.route.paramMap
      .pipe(
        switchMap((params) => {
          this.id = Number(params.get('id'));
          if (this.id || this.id > 0) {
            return this.studentService.getStudentById(this.id);
          }
        }),
        catchError((errorMessage) => {
          this.errorMessage = errorMessage;
          return of(undefined);
        })
      )
      .subscribe((res: any) => {
        if (!res) {
          this.router.navigate(['/center-management/students'], {
            relativeTo: this.route,
          });
        }
        this.studentDetail = res;
        this.loadForm();
      });
  }

  getDistrictsByProvinceCode(provinceCode, isHandlingFilter) {
    this.districtService
      .getByProvinceCode(provinceCode)
      .then((res: any) => {
        if (!res) {
          this.toastr.error('', GENERAL_ERROR_MESSAGE);
          this.cd.detectChanges();
        }
        if (res.status == HTTP_RESPONSE_TYPE.SUCCESS) {
          this.districts = res.returnData;
          if (this.districts.length > 0) {
            let firstDistrict = this.districts[0];
            let firstDistrictCode = firstDistrict.code;
            if (isHandlingFilter) {
              this.studentForm.controls['districtCode'].setValue(firstDistrictCode);
              this.getWardsByDistrictCode(firstDistrictCode, isHandlingFilter);
            } else {
              if (this.id) {
                this.getWardsByDistrictCode(this.studentDetail.student.districtCode, isHandlingFilter);
              }
            }
          } else {
            this.studentForm.controls['districtCode'].setValue('');
            this.studentForm.controls['wardCode'].setValue('');
          }
        } else {
          this.toastr.error('', res.message);
          this.cd.detectChanges();
        }
      })
      .catch((e) => {
        this.toastr.error('', e.error);
        this.cd.detectChanges();
      });
  }

  getWardsByDistrictCode(districtCode, isHandlingFilter) {
    this.wardService
      .getByDistrictCode(districtCode)
      .then((res: any) => {
        if (!res) {
          this.toastr.error('', GENERAL_ERROR_MESSAGE);
        }
        if (res.status == HTTP_RESPONSE_TYPE.SUCCESS) {
          this.wards = res.returnData;
          if (this.wards.length > 0) {
            if (isHandlingFilter) {
              var firstwardCode = this.wards[0]?.code;
              this.studentForm.controls['wardCode'].setValue(firstwardCode);
            }
          } else {
            this.studentForm.controls['wardCode'].setValue('');
          }
        }

        this.cd.detectChanges();
      })
      .catch((e) => {
        this.toastr.error('', e.error);
        this.cd.detectChanges();
      });
  }

  loadForm() {
    if (!(this.studentDetail.student && this.studentDetail.parentInfo)) {
      return;
    }
    this.studentForm = this.fb.group({
      name: [this.studentDetail.student.name, Validators.compose([Validators.required])],
      address: [this.studentDetail.student.address],
      avatar: [this.studentDetail.student.avatar],
      id: [this.studentDetail.student.id],
      code: [this.studentDetail.student.code, Validators.compose([Validators.required])],
      gender: [this.studentDetail.student.gender, Validators.compose([Validators.required])],
      provinceCode: [this.studentDetail.student.provinceCode],
      districtCode: [this.studentDetail.student.districtCode],
      wardCode: [this.studentDetail.student.wardCode],
      dob: [this.date.transform(this.studentDetail.student.dob, 'yyyy-MM-dd'), Validators.required],
      parentName: [this.studentDetail.parentInfo.name],
      parentId: [this.studentDetail.parentInfo.parentId, Validators.compose([Validators.required])],
      phoneNumber: [this.studentDetail.parentInfo.phoneNumber, Validators.compose([Validators.pattern(REGEX_PN)])],
    });
    if (this.studentDetail.student.provinceCode) {
      this.getDistrictsByProvinceCode(this.studentDetail.student.provinceCode, false);
    }
    this.cd.detectChanges();
  }
  isControlValid(controlName: string): boolean {
    var control = this.studentForm.controls[controlName];
    return control.valid && (control.dirty || control.touched);
  }

  isControlInvalid(controlName: string): boolean {
    var control = this.studentForm.controls[controlName];
    return control.invalid && (control.dirty || control.touched);
  }
  controlHasError(validation: string, controlName: string) {
    var control = this.studentForm.controls[controlName];
    return control.hasError(validation) && (control.dirty || control.touched);
  }

  save() {
    this.isSubmitted = true;
    this.submitted = true;
    let model = { ...this.studentDetail.student, ...this.studentForm.value };
    model.gender = model.gender.toString() == 'true';

    if (!model.avatar) {
      model.avatar = '';
    }
    let textMess = (this.id ? 'Chỉnh sửa' : 'Thêm') + ' học sinh';
    this.studentService
      .saveStudent(model)
      .then(() => {
        this.submitted = false;
        this.router.navigate([`/center-management/classes/detail/${this.studentDetail.classInfo.classId}`]);
        this.toastr.success('', textMess + ' thành công');
      })
      .catch((e) => {
        this.isSubmitted = false;
        this.toastr.error('', e.error.message);
        this.submitted = false;
        this.cd.detectChanges();
      });
  }

  changeAddress = (id: any, type: any) => {
    if (type == 'province') {
      var provinceCode = id;
      if (provinceCode) {
        this.getDistrictsByProvinceCode(provinceCode, true);
      } else {
        this.studentForm.controls['wardCode'].setValue('');
        this.studentForm.controls['districtCode'].setValue('');
      }
    } else {
      var districtCode = id;
      if (districtCode) {
        this.getWardsByDistrictCode(districtCode, true);
      } else {
        this.studentForm.controls['wardCode'].setValue('');
      }
    }
  };

  setSrc($event: any) {
    this.studentDetail.student.avatar = $event;
  }

  handleChangeAddress = (event: any, type: any) => {
    this.changeAddress(event.target.value, type);
  };
  returnClass = () => {
    if (this.classId) {
      let url = '/center-management/classes/detail/' + this.classId;
      this.router.navigateByUrl(url, {});
    } else {
      this.router.navigate(['/classes']);
    }
  };
}
