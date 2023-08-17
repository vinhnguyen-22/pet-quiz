import { AKITA_STORE, HTTP_RESPONSE_TYPE, SCHOOL_IMPLEMENTATION_TYPE } from '../../../../containers/constants/index';
import { OrganizationService } from 'src/app/containers/services/organization.service';
import { UserService } from 'src/app/containers/services/user.service';
import { Component, ChangeDetectorRef, ViewChild, ElementRef, HostListener } from '@angular/core';
import { ClassService } from 'src/app/containers/services/class.service';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { ROLE, SCHOOL_TYPE, DAYOFWEEK } from 'src/app/containers/constants';
import { AuthService } from 'src/app/containers/services/auth/auth.service';
import { OptionQuery } from 'src/app/store/option/optionQuery';
import { ProgramService } from 'src/app/containers/services/program.service';
import KTWizard from 'src/assets/js/components/wizard.js';
import { KTUtil } from 'src/assets/js/components/util';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { STATUSES } from 'src/app/containers/constants';
import { ToastrService } from 'ngx-toastr';
import { FormCanDeactivate } from 'src/app/containers/guards/can-deactivate/can-deactivate';
import { generateClassCode } from 'src/app/containers/helper';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
declare var $: any;

@Component({
  selector: 'app-classes-edit',
  templateUrl: './classes-edit.component.html',
  styleUrls: ['./classes-edit.scss'],
})
export class ClassesEditComponent extends FormCanDeactivate {
  isSubmitted: boolean;
  @ViewChild('NOTIFY_CONFIRM') NOTIFY_CONFIRM: any;

  @ViewChild('wizard', { static: true }) el: ElementRef;
  wizard: any;
  dropdownSettingsTeacher: IDropdownSettings = {};
  private CLASS = 'classes';
  id: number;
  maxDate: any;
  EMPTY_CLASS: any = {
    teachingPlan: {
      dateStart: new Date(),
      lessonPerWeek: '',
      programId: 0,
      dayStudy: '',
      teacherPlans: [],
      studyTime: '',
    },
    classInfo: {
      id: 0,
      classCode: '',
      yearId: 0,
      listTeachers: [],
      className: '',
      organizationId: 0,
      gradeId: 0,
      status: 1,
      isTeaching: false,
    },
  };
  classDetail: any = this.EMPTY_CLASS;
  classForm: FormGroup;
  teachingPlanForm: FormGroup;
  typeOr: number = 0;
  teachers: Array<any> = [];
  status: Array<any> = STATUSES;
  days: Array<any> = DAYOFWEEK;
  listTeachers: Array<any> = [];
  grades: Array<any> = [];
  years: Array<any> = [];
  programs: Array<any> = [];
  _programs: Array<any> = [];
  schools: Array<any> = [];
  listTimeForm = new FormArray([]);
  currentUser: any;
  filterProgram = {
    name: '',
    gradeId: 0,
    organId: 0,
  };
  validTime: boolean = true;
  errorMessage = '';
  selectedSchool: any = {};
  lastClassId: any;
  labelProgram = '';
  constructor(
    private teachersService: UserService,
    private organizationService: OrganizationService,
    private optionQuery: OptionQuery,
    private fb: FormBuilder,
    private router: Router,
    private date: DatePipe,
    public classService: ClassService,
    private auth: AuthService,
    private cd: ChangeDetectorRef,
    private programService: ProgramService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private modalService: NgbModal
  ) {
    super();
    this.auth.currentUserSubject.asObservable().subscribe((res) => {
      this.currentUser = res;
      this.typeOr = this.currentUser.organization.type;
    });
    let now = Date.now();
    this.maxDate = date.transform(now, 'yyyy-MM-dd');
  }

  ngOnInit(): void {
    this.dropdownSettingsTeacher = {
      idField: 'id',
      textField: 'userName',
      selectAllText: 'Chọn tất cả',
      unSelectAllText: 'Bỏ chọn',
      allowSearchFilter: true,
      searchPlaceholderText: 'Tìm giáo viên',
      noDataAvailablePlaceholderText: 'Không có dữ liệu giáo viên',
    };
    this.classDetail.classInfo.className = '';
    this.loadOption();
  }

  ngAfterViewInit(): void {
    this.wizard = new KTWizard(this.el.nativeElement, {
      startStep: 1,
    });
    this.wizard.on('beforeNext', (wizardObj) => {});
    this.wizard.on('change', () => {
      setTimeout(() => {
        KTUtil.scrollTop();
      }, 500);
    });
  }

  loadOption = () => {
    let options$ = this.optionQuery.selectAll();
    options$.subscribe((options) => {
      this.setInitialValues(options);
    });
  };

  setInitialValues = (options: any) => {
    if (options.length > 0) {
      let years = [...options[AKITA_STORE.YEAR]];
      this.years = years.reverse();
      this.grades = options[AKITA_STORE.GRADE];
      if (!this.id) {
        this.classDetail.classInfo.gradeId = this.grades[0].id;
        this.classDetail.classInfo.yearId = this.years[0].id;
      }
      this.loadClass();
    }
  };

  getLastClassId() {
    this.classService
      .getLastClassId()
      .then((res: any) => {
        this.lastClassId = res;
      })
      .catch((e: any) => {});
  }
  getPrograms = (type) => {
    this.programService
      .getAllWithoutDetails(this.filterProgram)
      .then((res: any) => {
        this._programs = res;
        this.programs = this._programs.filter((x) => x.gradeId == this.filterProgram.gradeId);
        if (!this.id || type == 'second') {
          if (this.programs.length > 0) {
            let p = this.programs[0];
            this.teachingPlanForm.controls['programId'].setValue(p?.id || '');
            let grade = this.grades.find((x) => x.id == this.classForm.value.gradeId);
            this.labelProgram = `Chương trình KIDSEnglish ${grade.name} với ${p.lessonPerWeek} tiết học/tuần`;
            this.listTimeForm = new FormArray([]);
            for (let index = 0; index < p?.lessonPerWeek || 0; index++) {
              let value = { day: '', studyTimeStart: '09:00', studyTimeEnd: '09:30', valid: true, teacherId: '', id: 0 };
              this.addTimeStudy(value);
            }
            this.teachingPlanForm.controls['lessonPerWeek'].setValue(p?.lessonPerWeek || 0);
          }
        }
        this.cd.detectChanges();
      })
      .catch((e: any) => {});
  };

  loadClass() {
    this.route.paramMap
      .pipe(
        switchMap((params) => {
          this.id = Number(params.get('id'));
          if (this.id || this.id > 0) {
            return this.classService.getItemById(this.CLASS, this.id);
          }
          return of(this.EMPTY_CLASS);
        }),
        catchError((errorMessage) => {
          this.errorMessage = errorMessage;
          return of(undefined);
        })
      )
      .subscribe((res: any) => {
        if (!res) {
          this.router.navigate(['/center-management/schools'], {
            relativeTo: this.route,
          });
        }
        this.classDetail = res;
        this.classDetail.teachingPlan.listDays = this.formatDay(res.teachingPlan?.dayStudy);
        this.formatTime(this.classDetail.teachingPlan);
        this.filterProgram.gradeId = this.classDetail?.classInfo?.gradeId;
        if (this.typeOr == SCHOOL_TYPE) {
          if (!this.id) {
            this.classDetail.classInfo.organizationId = this.currentUser.organization.id;
          }
          this.filterProgram.organId = this.currentUser.organization.id;
          this.getPrograms('first');
          this.getTeachers(this.currentUser.organization.id);
        } else {
          this.getSchool();
        }
        if (!this.id) {
          this.getLastClassId();
        }
        this.loadForm();
      });
  }

  loadForm() {
    if (!(this.classDetail.teachingPlan && this.classDetail.classInfo)) {
      return;
    }
    this.classForm = this.fb.group({
      className: [this.classDetail.classInfo.className, Validators.compose([Validators.required])],
      id: [this.classDetail.classInfo.id],
      organizationId: [{ value: this.classDetail.classInfo.organizationId, disabled: this.id }, Validators.compose([Validators.required])],
      gradeId: [
        { value: this.classDetail.classInfo.gradeId, disabled: this.classDetail.classInfo.isTeaching },
        Validators.compose([Validators.required]),
      ],
      status: [this.classDetail.classInfo.status, Validators.compose([Validators.required])],
      yearId: [
        {
          value: this.classDetail.classInfo.yearId,
          disabled: this.id,
        },
        Validators.compose([Validators.required]),
      ],
      listTeachers: [this.classDetail.classInfo.listTeachers, Validators.compose([Validators.required])],
    });
    this.teachingPlanForm = this.fb.group({
      dateStart: [
        { value: this.date.transform(this.classDetail.teachingPlan.dateStart, 'yyyy-MM-dd'), disabled: this.classDetail.classInfo.isTeaching },
        Validators.compose([Validators.required]),
      ],
      programId: [
        { value: this.classDetail.teachingPlan.programId, disabled: this.classDetail.classInfo.isTeaching },
        Validators.compose([Validators.required]),
      ],
      lessonPerWeek: [this.classDetail.teachingPlan.lessonPerWeek],
      dayStudy: [this.classDetail.teachingPlan.dayStudy],
      studyTime: [this.classDetail.teachingPlan.studyTime],
    });
    this.cd.detectChanges();
  }

  formatDay = (day: any) => {
    let _arr = [];
    const arr = day.split('/');
    _arr =
      arr.map((a: any) => {
        return this.days.find((ld: any) => {
          return ld.key == a;
        });
      }) || [];
    _arr = _arr.filter((e: any) => e);
    return _arr;
  };

  formatTime(obj: any) {
    if (this.classDetail.classInfo.classId > 0) {
      obj.teacherPlans.forEach((c) => {
        this.addTimeStudy({ ...c, valid: this.compareTime(c.studyTimeStart, c.studyTimeEnd) });
      });
    }
  }

  getTeachers = (organId) => {
    let params = {
      status: 1,
      searchTerm: '',
      roleId: ROLE.TEACHER,
      organId: organId,
    };
    this.teachersService
      .getByModel('users', params)
      .then((res: any) => {
        this.teachers = res;
        this.cd.detectChanges();
      })
      .catch((e) => {});
  };

  getSchool = () => {
    this.organizationService
      .getOrganSelect()
      .then((res: any) => {
        this.schools = res.filter((s: any) => s.implementType == SCHOOL_IMPLEMENTATION_TYPE.ALL);
        if (!this.id) {
          this.classForm.controls['organizationId'].setValue(this.schools[0].id || '');
        }
        let organId = this.id ? this.classDetail.classInfo.organizationId : this.classForm.value.organizationId;
        this.filterProgram.organId = organId;
        this.getTeachers(organId);
        this.getPrograms('first');
      })
      .catch((e: any) => {});
  };

  save() {
    if (!this.id) {
      this.classDetail.classInfo.classCode =
        this.classForm.value.organizationId + '.' + this.classForm.value.gradeId + '.' + generateClassCode(this.lastClassId + 1);
    }
    let model: any = {
      classInfo: { ...this.classDetail.classInfo, ...this.classForm.value },
      teachingPlan: { ...this.classDetail.teachingPlan, ...this.teachingPlanForm.value },
    };
    model.teachingPlan.dayStudy = this.listTimeForm.value
      .map((x: any) => {
        let t = this.classDetail.teachingPlan.teacherPlans.find((a) => (a.id = x.id));
        return x.day || t.day;
      })
      .sort()
      .join('/');
    let listTime = this.listTimeForm.value.map((x: any) => {
      let t = this.classDetail.teachingPlan.teacherPlans.find((a) => (a.id = x.id));

      return { start: x.studyTimeStart || t?.studyTimeStart, end: x.studyTimeEnd || t?.studyTimeEnd, key: parseInt(x.day) || t?.day };
    });
    model.teachingPlan.studyTime = JSON.stringify(listTime);
    model.teachingPlan.teacherPlans = this.listTimeForm.value.map((x: any) => {
      let t = this.classDetail.teachingPlan.teacherPlans.find((a) => (a.id = x.id));
      return {
        teacherId: x.teacherId,
        classesId: this.id,
        yearId: model.classInfo.yearId,
        day: x.day || t?.day,
        studyTimeStart: x.studyTimeStart || t?.studyTimeStart,
        studyTimeEnd: x.studyTimeEnd || t?.studyTimeEnd,
        id: x.id,
      };
    });
    let result = this.listTimeForm.value.map((x: any) => {
      let t = this.classDetail.teachingPlan.teacherPlans.find((a) => a.id == x.id);
      return (x.day || t?.day) + (x.studyTimeStart || t?.studyTimeStart) + (x.studyTimeEnd || t?.studyTimeEnd);
    });
    debugger;
    let isHas = result.reduce((x, y, i) => {
      return x || result.find((x, j) => x == y && i != j);
    }, false);
    if (isHas) {
      this.toastr.error('', 'Giờ học của lớp đang bị trùng');
      return;
    }
    let textMess = (this.id ? 'Chỉnh sửa' : 'Thêm') + ' lớp học';
    this.isSubmitted = true;
    this.teachersService
      .post(this.CLASS + '/updateClass', model)
      .then((res: any) => {
        if (res && res.status == HTTP_RESPONSE_TYPE.ERROR) {
          this.toastr.error('', res.message);
          this.isSubmitted = false;
        } else {
          this.toastr.success('', textMess + ' thành công');
          if (this.id) {
            this.back();
          } else {
            let organId = model.classInfo.organizationId;
            this.selectedSchool = this.schools.find((s) => s.id == organId);
            this.modalService.open(this.NOTIFY_CONFIRM, {
              size: 'lg',
            });
          }
        }
        this.cd.detectChanges();
      })
      .catch((e) => {
        this.isSubmitted = false;
        this.toastr.error('', textMess + ' thất bại');
        this.cd.detectChanges();
      });
  }

  continue = () => {
    this.isSubmitted = false;
    this.modalService.dismissAll();
    this.wizard.goTo(1);
    this.classForm.controls['className'].setValue('');
    $('#className').focus();
  };

  filterData = (event: any) => {
    switch (event.target.name) {
      case 'gradeId':
        this.filterProgram.gradeId = this.classForm.value.gradeId;
        this.getPrograms('second');
        break;
      case 'programId':
        let lpw = this.programs.find((s: any) => s.id == this.teachingPlanForm.value.programId)?.lessonPerWeek || 0;
        this.teachingPlanForm.controls['lessonPerWeek'].setValue(lpw);
        this.listTimeForm = new FormArray([]);
        for (let index = 0; index < lpw; index++) {
          let teachersLength = this.listTeachers.length;
          let teacherId = '';
          if (teachersLength > 0) {
            teacherId = this.listTeachers[index % teachersLength].id;
          }
          let value = { day: '', studyTimeStart: '09:00', studyTimeEnd: '09:30', valid: true, teacherId: teacherId, id: 0 };
          this.addTimeStudy(value);
        }
        if (lpw != 0) {
          let grade = this.grades.find((x) => x.id == this.classForm.value.gradeId);
          this.labelProgram = `Chương trình KIDSEnglish ${grade.name} với ${lpw} tiết học/tuần`;
        } else {
          this.labelProgram = '';
        }
        break;
      default:
        break;
    }
  };

  addTimeStudy(c) {
    const group = this.fb.group({
      day: [
        {
          value: c.day,
          disabled: this.classDetail.classInfo.isTeaching,
        },
        Validators.compose([Validators.required]),
      ],
      studyTimeEnd: [
        {
          value: c.studyTimeEnd,
          disabled: this.classDetail.classInfo.isTeaching,
        },
        Validators.compose([Validators.required]),
      ],
      studyTimeStart: [
        {
          value: c.studyTimeStart,
          disabled: this.classDetail.classInfo.isTeaching,
        },
        Validators.compose([Validators.required]),
      ],
      valid: [c.valid, Validators.compose([Validators.required])],
      teacherId: [c.teacherId, Validators.compose([Validators.required])],
      classesId: [c.classesId],
      id: [c.id, Validators.compose([Validators.required])],
      yearId: [c.yearId],
    });
    this.listTimeForm.push(group);
  }
  changeTime(timeControl, type) {
    let time = timeControl.value;
    if (type == 'start') {
      let timeStart = Math.round(new Date(`1970-01-01 ${time.studyTimeStart}:00 GMT+0`).getTime() / 1000);
      let timeEnd = timeStart + 30 * 60;
      let stringTimeEnd =
        (Math.floor(timeEnd / 3600) > 9 ? '' : '0') +
        Math.floor(timeEnd / 3600) +
        ':' +
        ((Math.floor((timeEnd % 3600) / 60) > 9 ? '' : '0') + Math.floor((timeEnd % 3600) / 60));
      timeControl.controls['studyTimeEnd'].setValue(stringTimeEnd);
      time = timeControl.value;
    }
    timeControl.controls['valid'].setValue(this.compareTime(time.studyTimeStart, time.studyTimeEnd));
    this.validTime = this.listTimeForm.value.reduce((p, x) => x.valid && p, true);
    this.cd.detectChanges();
  }
  compareTime(start, end) {
    var regex = new RegExp(':', 'g'),
      timeStr1 = start,
      timeStr2 = end;
    return parseInt(timeStr1.replace(regex, ''), 10) < parseInt(timeStr2.replace(regex, ''), 10);
  }
  nextStep() {
    this.listTeachers = this.classForm.value.listTeachers;
    let teachersLength = this.listTeachers.length;
    this.listTimeForm.controls.forEach((t: any, i) => {
      if (t.value.id == 0 && teachersLength > 0) {
        t.controls['teacherId'].setValue(this.listTeachers[i % teachersLength].id);
      }
      let isHas = this.listTeachers.some((x) => x.id == t.value.teacherId);
      if (!isHas) {
        t.controls['teacherId'].setValue('');
      }
    });
  }
  isControlValid(formGroup, controlName: string): boolean {
    const control = formGroup.controls[controlName];
    return control.valid && (control.dirty || control.touched);
  }

  isControlInvalid(formGroup, controlName: string): boolean {
    const control = formGroup.controls[controlName];
    return control.invalid && (control.dirty || control.touched);
  }

  controlHasError(formGroup, validation: string, controlName: string) {
    const control = formGroup?.controls[controlName];
    return control.hasError(validation) && (control.dirty || control.touched);
  }
  back() {
    let organId = this.classForm.value.organizationId || this.classDetail.classInfo.organizationId;
    this.router.navigateByUrl('/center-management/classes', {
      state: { organId },
    });
    this.modalService.dismissAll();
  }
}
