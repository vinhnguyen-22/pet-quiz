import { ToastrService } from 'ngx-toastr';
import { Component, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from 'src/app/containers/services/auth/auth.service';
import { ShareService } from 'src/app/containers/services/share/share.service';
import { UserService } from '../../../containers/services/user.service';
import { AKITA_STORE, ROLE, STATUSES } from 'src/app/containers/constants';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { OptionQuery } from 'src/app/store/option/optionQuery';
import { CommonModalComponent } from 'src/app/modules/SharedModule/modal/modal.component';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-teacher-list',
  templateUrl: './list.component.html',
})
export class TeacherListComponent {
  @ViewChild('confirmationModal')
  private modalComponent: CommonModalComponent;
  @ViewChild('ModalView') ModalView: any;
  @ViewChild('fileInput')
  myInputVariable: ElementRef;
  private USER_GET_ALL = 'users';
  currentId = 0;
  currentUser: any;
  filter = {
    searchTerm: '',
    status: 0,
    roleId: ROLE.TEACHER,
    organId: 0,
  };
  checkGuard = false;
  status = STATUSES;
  objectDataTable: any = {
    datas: [],
    headers: [
      {
        key: 'userName',
        value: 'Họ tên',
        width: '',
      },
      {
        key: 'gender',
        value: 'Giới Tính',
      },
      {
        key: 'phoneNumber',
        value: 'Điện thoại',
      },
      {
        key: 'email',
        value: 'Email',
      },
      {
        key: 'dateStart',
        value: 'Ngày vào làm',
        type: 'day',
      },
      {
        key: 'status',
        value: 'Trạng thái',
        type: 'status',
      },
    ],
  };
  countries: any;

  constructor(
    public teachersService: UserService,
    private cd: ChangeDetectorRef,
    public shareService: ShareService,
    private userService: UserService,
    private date: DatePipe,
    private auth: AuthService,
    private toastr: ToastrService,
    private optionQuery: OptionQuery
  ) {
    this.auth.currentUserSubject.asObservable().subscribe((res) => {
      this.currentUser = res;
      this.filter.organId = this.currentUser?.organization?.id;
      this.checkGuard = this.currentUser?.organization.centerId == 1 || this.currentUser?.organization.type == 1;
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
      this.getTeachers();
    }
  };
  changeFilter = (event: any) => {
    this.getTeachers();
  };

  getTeachers = () => {
    this.teachersService
      .getByModel(this.USER_GET_ALL, this.filter)
      .then((res: any) => {
        this.objectDataTable.datas = res;
        this.cd.detectChanges();
      })
      .catch((e) => { });
  };

  upload = ($event: any) => {
    var file = $event.target.files[0];
    let formData = new FormData();
    formData.append('upload', file);
    formData.append('organId', this.currentUser.organization.id);
    formData.append('userRole', ROLE.TEACHER.toString());
    this.shareService.uploadExcel(formData, 'employee').subscribe(
      (res: any) => {
        if (res) {
          this.getTeachers();
          this.toastr.success('', 'Upload danh sách giáo viên thành công');
          this.myInputVariable.nativeElement.value = '';
        } else {
          this.toastr.error('', 'Upload danh sách giáo viên thất bại');
        }
      },
      (err) => {
        this.toastr.error('', err.error.message || err.error);
        this.myInputVariable.nativeElement.value = '';
      }
    );
  };

  remove(id) {
    let values = {
      currentId: id,
    };
    this.openRemoveConfirmationModal(values, 'Xoá giáo viên', 'Bạn có muốn xoá giáo viên này không?');
  }

  async openRemoveConfirmationModal(values, title: string, text: string) {
    return await this.modalComponent.openDeleteConfirmationModal(values, title, text);
  }

  getConfirmationValue($event: any) {
    let returnData = $event;

    if (returnData.result == 'Confirm') {
      let teacherId = returnData.values.currentId;
      this.teachersService
        .remove(teacherId)
        .then((res: any) => {
          if (res) {
            this.getTeachers();
            this.toastr.success('', 'Xóa Giáo viên thành công');
          } else {
            this.toastr.error('', 'Xóa giáo viên thất bại');
          }
        })
        .catch((e) => {
          this.toastr.error('', 'Xóa giáo viên thất bại');
        });
    }
  }

  resetPassword(id) {
    this.userService
      .resetPassword(id)
      .then((res: any) => {
        if (res) {
          this.toastr.success('', 'Thay đổi về mật khẩu mặc dịnh');
        }
      })
      .catch((e) => {
        this.toastr.error('', 'Thất bại');
      });
  }

  convertDataToExcel = (datas: any) => {
    let dataConverted = datas.map((item: any, i: number) => {
      return {
        STT: i + 1,
        'Họ và tên': item.userName,
        'Giới tính': item.gender ? 'Nam' : 'Nữ',
        'Ngày sinh': this.date.transform(item.dateOfBirth, 'dd/MM/yyyy'),
        'Quốc tịch': item.nationalityId ? this.getCountries(item.nationalityId) : "",
        'Địa chỉ Email': item.email,
        'Số điện thoại': item.phoneNumber,
        'Ngày vào làm': this.date.transform(item.dateStart, 'dd/MM/yyyy'),
        'Lớp đang dạy': item.classNameList.toString()
      };
    });
    return dataConverted;
  };

  getCountries = (nationalityId) => {
    let ethnicObj = this.countries.find((country) => {
      return country.id == nationalityId;
    });
    return ethnicObj.vietnameseName;
  };

  public exportExcel(): void {
    let datas = this.convertDataToExcel(this.objectDataTable.datas);
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(datas);
    const wb: XLSX.WorkBook = { Sheets: { data: ws }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(wb, {
      bookType: 'xlsx',
      type: 'array',
    });
    this.saveExcelFile(excelBuffer);
  }

  private saveExcelFile(buffer: any): void {
    let fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const data: Blob = new Blob([buffer], { type: fileType });
    saveAs(data, 'Danh sách giáo viên' + '.xlsx');
  }
}
