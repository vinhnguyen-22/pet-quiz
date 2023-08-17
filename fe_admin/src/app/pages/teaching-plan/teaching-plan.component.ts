import { element } from 'protractor';
import { AKITA_STORE } from './../../containers/constants/index';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Directive, OnInit, ViewChild } from '@angular/core';
import { DAYOFWEEK, ROLE } from 'src/app/containers/constants';
import { OrganizationService } from 'src/app/containers/services/organization.service';
import { ClassService } from 'src/app/containers/services/class.service';
import { TeachingPlanService } from 'src/app/containers/services/teaching-plan.service';
import * as moment from 'moment';
import { AuthService } from 'src/app/containers/services/auth/auth.service';
import { OptionQuery } from 'src/app/store/option/optionQuery';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/containers/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { NgSelectComponent } from '@ng-select/ng-select';

@Component({
  selector: 'app-teaching-plan',
  templateUrl: './teaching-plan.component.html',
  styleUrls: ['./teaching-plan.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeachingPlanComponent implements OnInit {
  private ORGAN_GET_ALL = 'organizations/get';
  currentUser: any = {};
  loading = false;
  typeOr: number = 0;
  startWeek: any = moment().isoWeekday(1).startOf('day').unix();
  _timeOptions = [-7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7];
  timeOptions: any = [{ name: '', value: moment() }];
  data: any;
  classes: any = [];
  schools: any = [];
  weeks: any = [];
  classDetail: any;
  years = [{ id: 0, name: '' }];
  teachers = [];
  filterClass: any = {
    teacherId: 0,
    yearId: 0,
    gradeId: 0,
    roleId: 0,
    programId: 0,
    name: '',
    organId: 0,
  };
  filterTeacher: any = {
    searchTerm: '',
    status: 1,
    roleId: ROLE.TEACHER,
    organId: 0,
  };
  selectedTeachingPlan: any = {};
  teachingPlan: any = {};
  dataCount = 0;
  filter = {
    week: '',
    classId: 0,
  };
  oldOrganId: any;
  oldClassId: number;
  oldTeacherOrganId: any;
  constructor(
    public teachingPlanService: TeachingPlanService,
    public teachersService: UserService,
    public classService: ClassService,
    public organizationService: OrganizationService,
    private toastr: ToastrService,
    public router: Router,
    private cd: ChangeDetectorRef,
    private modalService: NgbModal,
    private auth: AuthService,
    public optionQuery: OptionQuery
  ) {
    this.auth.currentUserSubject.asObservable().subscribe((res) => {
      this.currentUser = res;
      this.filterClass.teacherId = this.currentUser?.roleId == ROLE.TEACHER ? this.currentUser.id : 0;
      this.filter.week = this.startWeek;
      this.filterClass.roleId = this.currentUser?.roleId;
      this.typeOr = this.currentUser.organization.type;
    });
  }

  ngOnInit(): void {
    this.data = this.getNewDayOfWeek();
    this.loadOption();
  }

  loadOption() {
    let options$ = this.optionQuery.selectAll();
    options$.subscribe((options) => {
      this.setInitialValues(options);
    });
  }
  getNewDayOfWeek() {
    return DAYOFWEEK.map((x) => {
      return { ...x };
    });
  }

  setInitialValues = (options: any) => {
    if (options.length > 0) {
      let years = [...options[AKITA_STORE.YEAR]].reverse();
      this.years = years;
      this.filterClass.yearId = years[0].id;
      this.weeks = this.createOptionsWeek();
      if (this.typeOr == 1) {
        this.getSchool();
      } else {
        this.filterClass.organId = this.currentUser?.organization?.id;
        this.oldOrganId = this.filterClass.organId;

        this.getClasses();
      }
    }
  };
  getTeachers = () => {
    this.teachersService
      .getByModel('users', this.filterTeacher)
      .then((res: any) => {
        this.teachers = res.filter((x) => x.id != this.selectedTeachingPlan.teacherId);
        this.cd.detectChanges();
      })
      .catch((e) => {});
  };
  createOptionsWeek = () => {
    let result = this._timeOptions.map((y) => {
      const result = {
        name:
          moment().isoWeekday(1).add(y, 'week').startOf('day').format('DD/MM') +
          '-' +
          moment().isoWeekday(7).add(y, 'week').startOf('day').format('DD/MM'),
        value: moment().isoWeekday(1).add(y, 'week').startOf('day').unix(),
        selected: y === 0,
      };
      return result;
    });
    return result;
  };

  getClasses = () => {
    this.classService
      .getClasses(this.filterClass)
      .then((res: any) => {
        this.classes = res;
        if (this.classes.length > 0) {
          this.filter.classId = res[0]?.classId || 0;
          this.cd.detectChanges();
          if (this.filter.classId > 0) {
            this.getTeachingPlan();
          } else {
            this.data = this.getNewDayOfWeek();
          }
        } else {
          this.classes = [{ classId: 0, className: 'Không có lớp học', disabled: true }];
          this.filter.classId = 0;
          this.data = this.getNewDayOfWeek();
          this.dataCount = 0;
        }
        this.oldClassId = this.filter.classId;
        this.cd.detectChanges();
      })
      .catch((e: any) => {
        this.data = this.getNewDayOfWeek();
        this.dataCount = 0;
        this.cd.detectChanges();
      });
  };
  getSchool = () => {
    this.organizationService
      .getOrganSelect()
      .then((res: any) => {
        this.schools = res;
        this.schools.forEach((s) => {
          s.name = s.districtName + ' / ' + s.name;
        });
        this.filterClass.organId = res[0].id;
        this.oldOrganId = this.filterClass.organId;
        this.getClasses();
        this.cd.detectChanges();
      })
      .catch((e: any) => {
        this.data = this.getNewDayOfWeek();
        this.dataCount = 0;
        this.cd.detectChanges();
      });
  };
  getTeachingPlan = () => {
    if (this.filter.classId && this.filter.classId > 0) {
      this.teachingPlanService
        .getTeachingPlan(this.filter)
        .then((res: any) => {
          this.classDetail = res;
          this.classDetail.studyDay = this.classDetail.studyDay.split('/').map((s: any) => parseInt(s));
          this.formatData();
          this.cd.detectChanges();
        })
        .catch((e: any) => {
          this.data = this.getNewDayOfWeek();
          this.dataCount = 0;
          this.cd.detectChanges();
        });
    } else {
      this.data = this.getNewDayOfWeek();
      this.dataCount = 0;
      this.cd.detectChanges();
    }
  };

  changeWeek = (event: any) => {
    this.startWeek = event;
    this.getTeachingPlan();
  };
  changeFilter = (event: any) => {
    if (event == 'school' || event == 'year') {
      if (this.filterClass.organId && this.oldOrganId != this.filterClass.organId) {
        this.oldOrganId = this.filterClass.organId;
        this.getClasses();
      }
    } else if (event == 'week') {
      this.changeWeek(this.filter.week);
    } else {
      if (this.filter.classId && this.oldClassId != this.filter.classId) {
        this.oldClassId = this.filter.classId;
        this.getTeachingPlan();
      }
    }
  };
  formatData = () => {
    this.data = this.data.map((h: any) => {
      let dataLesson = [];
      let teacherPlans = this.classDetail.teachingPlans.filter((l: any) => {
        return l.day === h.key;
      });
      let cls = this.classDetail;
      teacherPlans.forEach((c) => {
        let result = {
          programName: cls.programName,
          studyTime: c.studyTime,
          organizationName: cls.organizationName,
          className: cls.className,
          classId: cls.classId,
          lessonId: c.lesson.id,
          topicId: c.lesson.topic.id,
          programId: cls.programId,
          orderTopicId: c.lesson.topic.orderId,
          teachingPlanId: c.id,
          topicName: c.lesson.topic.name,
          lessonName: c.lesson.name,
          typeLesson: c.lesson.type,
          lesson: c.lesson,
          isFinished: c.isFinished,
          time: c.time,
          teacherName: c.teacherName,
          substituteTeacherId: c.substituteTeacherId,
          teacherId: c.teacherId,
        };
        dataLesson = [...dataLesson, result];
      });
      dataLesson.sort((a: any, b: any) => {
        return a.time - b.time;
      });
      const _h = { ...h, dataLesson: dataLesson };
      return _h;
    });
    this.dataCount = this.data.reduce((p, c) => {
      return p + c.dataLesson.length;
    }, 0);
    this.cd.detectChanges();
  };
  openLesson(lessonId) {
    // Converts the route into a string that can be used
    // with the window.open() function
    const url = this.router.serializeUrl(this.router.createUrlTree(['/lesson/' + lessonId]));

    window.open(url, '_blank');
  }
  download(type, lesson) {
    let url = '';
    if (type == 'pdf') {
      url = lesson.pdfFilePath;
    } else {
      url = lesson.wordFilePath;
    }
    window.open(url, '_blank');
  }
  openModalChangeTeacher(content, teachingPlan) {
    this.selectedTeachingPlan = { ...teachingPlan };
    this.teachingPlan = teachingPlan;
    this.filterTeacher.organId = this.currentUser.organization.id;
    this.oldTeacherOrganId = this.filterTeacher.organId;
    this.getTeachers();
    this.modalService.open(content, {
      size: 'xl',
    });
    this.cd.detectChanges();
  }
  changeFilterTeacher() {
    if (this.filterTeacher.organId) {
      this.oldTeacherOrganId = this.filterTeacher.organId;
      this.getTeachers();
    }
  }

  save() {
    let teacher = this.teachers.find((x) => x.id === this.selectedTeachingPlan.substituteTeacherId);
    let model = { teacherId: this.selectedTeachingPlan.substituteTeacherId, teachingPlanId: this.selectedTeachingPlan.teachingPlanId };
    this.teachersService
      .updateSubstituteTeacher(model)
      .then((res) => {
        this.teachingPlan.substituteTeacherId = this.selectedTeachingPlan.substituteTeacherId;
        this.teachingPlan.teacherName = teacher.userName;
        this.cd.detectChanges();
        this.modalService.dismissAll();
        this.toastr.success('', 'Chọn giáo viên dạy thay thành công');
      })
      .catch(() => {
        this.toastr.error('', 'Chọn giáo viên dạy thay thất bại');
      });
  }
  clear(type, element) {
    if (type == 'school') {
      this.filterClass.organId = this.oldOrganId;
      let item = element.itemsList.findItem(this.oldOrganId);
      element.select(item);
    } else if (type == 'class') {
      this.filter.classId = this.oldClassId;
      let item = element.itemsList.findItem(this.oldClassId);
      element.select(item);
    } else {
      this.filterTeacher.organId = this.oldTeacherOrganId;
      let item = element.itemsList.findItem(this.oldTeacherOrganId);
      element.select(item);
    }
    this.cd.detectChanges();
  }
}
