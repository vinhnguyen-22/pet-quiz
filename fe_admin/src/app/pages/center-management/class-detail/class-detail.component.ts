import { DATE_FORMAT } from './../../../containers/constants/index';
import { Observable } from 'rxjs';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AKITA_STORE, DAYOFWEEK, SCHOOL_IMPLEMENTATION_TYPE } from 'src/app/containers/constants';
import { ClassService } from 'src/app/containers/services/class.service';
import { StudentService } from 'src/app/containers/services/student.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/containers/services/auth/auth.service';
import { ShareService } from 'src/app/containers/services/share/share.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModalComponent } from 'src/app/modules/SharedModule/modal/modal.component';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-class-detail',
  templateUrl: './class-detail.component.html',
})
export class ClassDetailComponent implements OnInit {
  @ViewChild('confirmationModal')
  private modalComponent!: CommonModalComponent;
  isLoading = false;
  isLoading$: Observable<boolean>;
  classId: any = 0;
  listDay: any;
  activeTabId = 1;
  teachingPlan: any = {};
  students: any = [];
  checkGuard: boolean;
  classInfo: any = {};
  studentDetail: any;
  currentUser: any = {};
  isShowModelStudentDetail = false;
  description: any = {};
  descriptionTypes = [
    { index: 0, label: 'Mục tiêu chương trình', key: 'target', value: '' },
    { index: 1, label: 'Kĩ năng ngôn ngữ (nghe)', key: 'listening', value: '' },
    { index: 2, label: 'Kĩ năng ngôn ngữ (nói)', key: 'speaking', value: '' },
    { index: 3, label: 'Kĩ năng ngôn ngữ (đọc)', key: 'reading', value: '' },
    { index: 4, label: 'Kĩ năng ngôn ngữ (viết)', key: 'writing', value: '' },
    { index: 5, label: 'Kiến thức ngôn ngữ', key: 'language', value: '' },
    { index: 5, label: 'Kĩ năng khác', key: 'other', value: '' },
  ];

  defaultImageUrl = 'assets/img/avatars/default-avatar.png'
  constructor(
    private classService: ClassService,
    private studentService: StudentService,
    private cd: ChangeDetectorRef,
    public router: Router,
    private modalService: NgbModal,
    private actRoute: ActivatedRoute,
    private auth: AuthService,
    public shareService: ShareService,
    private toastr: ToastrService,
    private date: DatePipe,
  ) {
    this.classId = this.actRoute.snapshot.params['id'];
    this.currentUser = this.auth.currentUserValue;
    this.listDay = DAYOFWEEK;
  }

  ngOnInit(): void {
    this.getClassDetail();
  }
  setActiveTab(tabId: number) {
    this.activeTabId = tabId;
  }

  getActiveTabCSSClass(tabId: number) {
    if (tabId !== this.activeTabId) {
      return '';
    }
    return 'active';
  }

  getClassDetail = () => {
    this.classService
      .getClassDetail(this.classId)
      .then((res: any) => {
        this.students = res.students;
        this.classInfo = res.commonInfo.classInfo;
        if (this.currentUser.roleId == 50) {
          this.checkGuard = this.classInfo.organizationImplementType == SCHOOL_IMPLEMENTATION_TYPE.ALL;
        } else if (this.currentUser.roleId == 51) {
          this.checkGuard =
            this.currentUser.organization.centerId == 1 || this.classInfo.organizationImplementType == SCHOOL_IMPLEMENTATION_TYPE.HIRING_TEACHER;
        }
        this.teachingPlan = res.commonInfo.teachingPlan;
        this.cd.detectChanges();
        this.formatTimeAndDay(this.teachingPlan.dayStudy);
      })
      .catch((e) => { });
  };

  formatTimeAndDay = (day: any) => {
    let _arr = [];
    if (day) {
      const arr = day.split('/');
      _arr = arr.map((a: any) => {
        return this.listDay.find((ld: any) => {
          return ld.key == a;
        })?.value;
      });
      _arr = _arr.reduce((prev, currentValue) => {
        let check = prev.some((x) => x == currentValue);
        return check ? prev : [...prev, currentValue];
      }, []);
    }
    this.teachingPlan.dayStudyName = _arr.join(', ');
  };

  showStudentDetail(studentId) {
    this.studentService
      .getStudentById(studentId)
      .then((res: any) => {
        this.studentDetail = res;
      })
      .catch((e) => { });
  }

  showDescription = () => {
    this.getDescriptionType();
  };

  getDescriptionType() {
    this.descriptionTypes = this.descriptionTypes.map((desc: any) => {
      return {
        ...desc,
        value: this.description[desc.key],
      };
    });
    this.cd.detectChanges();
  }

  getDesc = (event: any) => {
    this.description = event.data;
  };

  open(content: any) {
    this.modalService.open(content, {
      size: 'xl',
    });
    this.showDescription();
  }
  back() {
    let organId = this.classInfo.organizationId;
    this.router.navigateByUrl('/center-management/classes', {
      state: { organId },
    });
  }
  goStudentDetail(studentId, type) {
    let url = '';
    if (type == 'edit') {
      url = 'student-edit/';
    } else {
      url = 'student-detail/';
    }
    this.router.navigateByUrl('/center-management/classes/' + url + studentId, {
      state: { studentId: studentId, classId: this.classId },
    });
  }

  upload = ($event: any, studentId: number) => {
    var file = $event.target.files[0];
    let formData = new FormData();
    formData.append('studentImage', file);
    this.studentService.uploadStudentMainImage(formData, studentId, this.classId)
      .then((res: any) => {
        if (res) {
          this.getClassDetail();
          this.toastr.success('', 'Upload ảnh thành công.');
        } else {
          this.toastr.error('', 'Upload ảnh thất bại.');
        }
      })
      .catch((e) => {
        this.toastr.error('', e.error.message || e.error);
      });
  };

  openRemoveStudentModal(studentId, studentName) {
    var values = {
      studentId: studentId,
      studentName: studentName,
      type: "Student"
    };

    let title = 'Xác nhận xoá';
    let text = 'Bạn có chắc chắn muốn xoá học sinh "' + studentName + '" không?';
    this.openModal(values, title, text);
  }

  openRemoveStudentMainImageModal(studentId, studentName) {
    var values = {
      studentId: studentId,
      studentName: studentName,
      type: "StudentMainImage"
    };

    let title = 'Xác nhận xoá';
    let text = 'Bạn có chắc chắn muốn xoá ảnh đại diện của học sinh "' + studentName + '" không?';
    this.openModal(values, title, text);
  }

  async openModal(values, title: string, text: string) {
    return await this.modalComponent.openDeleteConfirmationModal(values, title, text);
  }

  getConfirmationValue($event: any) {
    let returnData = $event;

    if (returnData.result == 'Confirm') {
      var studentId = returnData.values.studentId;
      var studentName = returnData.values.studentName;

      if (returnData.values.type == 'Student') {
        this.studentService.remove(studentId)
          .then((res: any) => {
            if (res) {
              this.getClassDetail();
              this.toastr.success('', 'Xoá học sinh ' + studentName + ' thành công.');
            } else {
              this.toastr.error('', 'Xoá học sinh ' + studentName + '  thất bại.');
            }
          })
          .catch((e) => {
            this.toastr.error('', e.error.message || e.error);
          });
      } else if (returnData.values.type == 'StudentMainImage') {
        this.studentService.removeStudentMainImage(studentId, this.classId)
          .then((res: any) => {
            if (res) {
              this.getClassDetail();
              this.toastr.success('', 'Xoá ảnh cho học sinh ' + studentName + ' thành công.');
            } else {
              this.toastr.error('', 'Xoá ảnh cho học sinh ' + studentName + ' thất bại.');
            }
          })
          .catch((e) => {
            this.toastr.error('', e.error.message || e.error);
          });
      }
    }
  }

  convertDataToExcel = (data: any) => {
    let dataConverted = data.students.map((item: any, i: number) => {
      return {
        'Mã học sinh': item.code,
        'Họ tên': item.name,
        'Giới tính': item.gender ? "Nam" : "Nữ",
        'Ngày sinh': this.date.transform(item.dob, DATE_FORMAT),
        'Họ tên phụ huynh': item.parentName,
        'Sdt phụ huynh': item.phoneNumber,
        'Tỉnh thành': item.provinceName,
        'Quận huyện': item.districtName,
        'Lớp học': data.classInfo.className
      };
    });
    return dataConverted;
  };

  public exportExcel(): void {
    let datas = this.convertDataToExcel({
      students: this.students, classInfo: this.classInfo
    });
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(datas);
    const wb: XLSX.WorkBook = { Sheets: { data: ws }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(wb, {
      bookType: 'xlsx',
      type: 'array',
    });
    this.isLoading = false;
    this.cd.detectChanges();
    this.saveExcelFile(excelBuffer);
  }

  private saveExcelFile(buffer: any): void {
    let fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const data: Blob = new Blob([buffer], { type: fileType });
    saveAs(data, 'Danh sách học sinh' + '.xlsx');
  }
}
