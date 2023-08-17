import { element } from 'protractor';
import { AKITA_STORE } from '../../../containers/constants/index';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ClassService } from 'src/app/containers/services/class.service';
import { OptionQuery } from 'src/app/store/option/optionQuery';
import { LocalStorageService } from 'src/app/containers/services/storage/local-storage.service';
import { OrganizationService } from 'src/app/containers/services/organization.service';
import { AuthService } from 'src/app/containers/services/auth/auth.service';
import { checkSchool, AVATAR_CLASS } from 'src/app/containers/constants';
import { CommonModalComponent } from 'src/app/modules/SharedModule/modal/modal.component';
import { ToastrService } from 'ngx-toastr';
import { ShareService } from '../../../containers/services/share/share.service';
import { NgSelectComponent } from '@ng-select/ng-select';
@Component({
  selector: 'app-list',
  templateUrl: './classes.component.html',
})
export class ClassesComponent implements OnInit {
  @ViewChild('confirmationModal')
  private modalComponent!: CommonModalComponent;
  typeOr: number = 0;
  avatarClass = AVATAR_CLASS;
  checkGuard = false;
  currentUser: any = {};
  classes: any = [];
  schools = [];
  filter = {
    gradeId: 0,
    name: '',
    organId: 0,
    roleId: 0,
    teacherId: 0,
    yearId: 0,
  };
  grades = [];
  years = [];
  headers = [
    {
      key: 'name',
      value: 'Lớp',
      width: '15%',
    },
    {
      key: 'classCode',
      value: 'Mã lớp',
      width: '10%',
    },
    {
      key: 'studentCount',
      value: 'Sĩ số',
      width: '6%',
    },
    {
      key: 'programName',
      value: 'Chương trình học',
      width: '15%',
    },
    {
      key: 'programName',
      value: 'Tiến độ dạy(bài)',
      width: '10%',
    },
    {
      key: '',
      value: 'Hành động',
    },
  ];
  private provinces = [];
  defaultId: number;
  oldOrganId: number;
  constructor(
    public classService: ClassService,
    public router: Router,
    private organizationService: OrganizationService,
    public optionQuery: OptionQuery,
    private cd: ChangeDetectorRef,
    public auth: AuthService,
    private toastr: ToastrService,
    public localStorage: LocalStorageService,
    public shareService: ShareService
  ) {
    this.currentUser = this.auth.currentUserValue;
    this.filter.teacherId = this.currentUser?.id;
    this.filter.roleId = this.currentUser?.roleId;
    this.typeOr = this.currentUser?.organization?.type;
    this.defaultId = this.router.getCurrentNavigation()?.extras?.state?.organId;
  }

  ngOnInit(): void {
    this.loadOption();
  }

  loadOption() {
    let options$ = this.optionQuery.selectAll();
    options$.subscribe((options) => {
      this.setInitialValues(options);
    });
  }

  setInitialValues = (options: any) => {
    if (options.length > 0) {
      this.years = [...options[AKITA_STORE.YEAR]];
      this.grades = options[AKITA_STORE.GRADE];
      this.provinces = options[AKITA_STORE.PROVINCE];
      if (this.typeOr == 2) {
        this.filter.organId = this.currentUser?.organization.id;
        this.oldOrganId = this.filter.organId;
        this.getClasses();
      } else {
        this.getSchool();
      }
    }
  };

  getSchool = () => {
    this.organizationService
      .getOrganSelect()
      .then((res: any) => {
        this.schools = res;
        this.schools.forEach((s) => {
          s.name = s.districtName + ' / ' + s.name;
        });
        let organId = 0;
        if (res.length > 0) {
          organId = res[0].id;
        }
        this.filter.organId = this.defaultId || organId;
        this.oldOrganId = this.filter.organId;
        this.getClasses();
        this.cd.detectChanges();
      })
      .catch((e: any) => {});
  };

  getClasses = () => {
    this.classService
      .getClasses(this.filter)
      .then((res: any) => {
        if (this.typeOr == 2) {
          this.checkGuard = checkSchool(this.currentUser?.organization, false);
        } else {
          let organ = this.schools.find((x) => x.id == this.filter.organId);
          this.checkGuard = checkSchool(organ, true);
        }
        this.classes = res;
        if (this.typeOr == 2) {
          this.checkGuard = checkSchool(this.currentUser?.organization, false);
        } else {
          let organ = this.schools.find((x) => x.id == this.filter.organId);
          this.checkGuard = checkSchool(organ, true);
        }

        this.cd.detectChanges();
      })
      .catch((e: any) => {});
  };
  changeFilter = () => {
    if (this.filter.organId) {
      this.oldOrganId = this.filter.organId;
      this.getClasses();
    }
  };
  clear(element) {
    this.filter.organId = this.oldOrganId;
    let item = element.itemsList.findItem(this.oldOrganId);
    element.select(item);
    this.cd.detectChanges();
  }
  remove(cls) {
    let values = {
      classId: cls.classId,
      className: cls.className,
    };

    this.openRemoveGameConfirmationModal(
      values,
      'Xoá lớp học',
      'Bạn có muốn xoá lớp học "' + cls.className + '" không? Tất cả dữ liệu liên quan đến học sinh sẽ bị xoá (KHÔNG THỂ LẤY LẠI)!!!'
    );
  }

  async openRemoveGameConfirmationModal(values, title: string, text: string) {
    return await this.modalComponent.openDeleteConfirmationModal(values, title, text);
  }

  getConfirmationValue($event: any) {
    let returnData = $event;

    if (returnData.result == 'Confirm') {
      let classId = returnData.values.classId;
      this.classService
        .remove(classId)
        .then((res: any) => {
          this.getClasses();
          this.toastr.success('', 'Xóa lớp học thành công');
        })
        .catch((e) => {
          this.toastr.error('', e.error.Message);
        });
    }
  }

  uploadStudent = ($event: any, classId) => {
    var file = $event.target.files[0];
    let formData = new FormData();
    formData.append('upload', file);
    formData.append('classId', classId.toString());
    this.shareService.uploadExcel(formData, 'student').subscribe(
      (res: any) => {
        this.classes.map((item) => {
          if (item.classId == res.classId) {
            item.studentCount += res.studentCount;
          }
          return item;
        });
        this.cd.detectChanges();
        this.toastr.success('', 'Upload dữ liệu học sinh thành công !');
      },
      (err) => {
        alert(err.error);
        window.location.reload();
      }
    );
  };
}
