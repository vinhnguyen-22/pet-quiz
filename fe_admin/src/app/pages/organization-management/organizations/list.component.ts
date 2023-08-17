import { UserService } from './../../../containers/services/user.service';
import {
  DATA_HEADER_SCHOOL,
  SCHOOL_TYPE,
  DATA_HEADER_CENTER,
  CENTER_TYPE,
  AKITA_STORE,
  HTTP_RESPONSE_TYPE,
  GENERAL_ERROR_MESSAGE,
  ROLE,
} from './../../../containers/constants/index';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { OrganizationService } from 'src/app/containers/services/organization.service';
import { OptionQuery } from 'src/app/store/option/optionQuery';
import { AuthService } from 'src/app/containers/services/auth/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProgramService } from 'src/app/containers/services/program.service';
import { ToastrService } from 'ngx-toastr';
import { ShareService } from 'src/app/containers/services/share/share.service';
import { DistrictService } from 'src/app/containers/services/district.service';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-user-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class OrganizationListComponent implements OnInit {
  isLoading = false;
  isSubmitted: boolean = false;
  currentUser: any;
  filter: any = {
    searchTerm: '',
    type: 0,
    provinceCode: '0',
    centerId: 1,
  };

  obj: any;
  configDua: any = {};
  isLoadProgram = false;
  programs: Array<any> = [];
  organization: any = { status: 0 };
  options: Array<any> = [];
  positions: Array<any> = [];
  provinces: Array<any> = [];
  districts: Array<any> = [];
  accountTypes: any = [];
  packages: any = [];
  representSchool: any = {};
  objectDataTable: any = {
    datas: [],
    headers: [],
  };

  public isSchool = false;

  ROLE_CUSTOMER_CARE = ROLE.CUSTOMER_CARE;
  provinceCode: any;

  constructor(
    private optionQuery: OptionQuery,
    public organizationService: OrganizationService,
    private toastr: ToastrService,
    private cd: ChangeDetectorRef,
    private modalService: NgbModal,
    private date: DatePipe,
    private router: Router,
    public programService: ProgramService,
    public auth: AuthService,
    public sharedService: ShareService, 
    private districtService: DistrictService
  ) {
    this.auth.currentUserSubject.asObservable().subscribe((res) => (this.currentUser = res));
    let url = window.location.href.split('/');
    this.isSchool = url[url.length - 1] == 'schools';
    if (this.isSchool) {
      this.filter.type = SCHOOL_TYPE;
      this.filter.centerId = this.currentUser.organization.id;
    } else {
      this.filter.type = CENTER_TYPE;
    }
    this.objectDataTable.headers = this.isSchool ? DATA_HEADER_SCHOOL : DATA_HEADER_CENTER;
    this.provinceCode = this.router.getCurrentNavigation()?.extras?.state?.provinceCode;
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

  getOrganizations = () => {
    this.organizationService
      .getAllOrganizations(this.filter)
      .then((res: any) => {
        this.objectDataTable.datas = res.map((data: any, idx: any) => {
          return {
            ...data,
            provinceName: data.province?.name,
            districtName: data.district?.name,
            checkStatus: data.centerId,
          };
        });
        this.cd.detectChanges();
      })
      .catch((e) => { });
  };

  getPrograms = () => {
    const params = {
      name: '',
      gradeId: 0,
      organId: 1,
    };
    this.programService
      .getByModel('programs', params)
      .then((res: any) => {
        this.isLoadProgram = true;
        this.programs = res;
      })
      .catch((e: any) => { });
  };

  setInitialValues = (options: any) => {
    if (options.length > 0) {
      this.options = options;
      this.provinces = options[AKITA_STORE.PROVINCE];
      this.positions = options[AKITA_STORE.POSITION];
      this.accountTypes = options[AKITA_STORE.ACCOUNT_TYPE];
      this.packages = options[AKITA_STORE.PACKAGE];
      let provinceCode = this.provinces[0].code;
      this.filter.provinceCode = this.provinceCode || provinceCode;
      if (this.isSchool) {
        this.getDistrictsByProvinceCode(provinceCode);
        this.getPrograms();
      } else {
        this.getOrganizations();
      }
    }
  };

  getDistrictsByProvinceCode(provinceCode) {
    this.districtService.getByProvinceCode(provinceCode).then((res: any) => {
      if (!res) {
        this.toastr.error('', GENERAL_ERROR_MESSAGE);
        this.cd.detectChanges();
      }

      if (res.status == HTTP_RESPONSE_TYPE.SUCCESS) {
        this.districts = res.returnData;
        if (this.isSchool) this.filter.districtCode = this.districts[0].code;
        this.getOrganizations();
      } else {
        this.toastr.error('', res.message);
        this.cd.detectChanges();
      }
    });
  }

  changeFilter(type: any) {
    if (type == 'provinceCode') {
      let province = this.options[AKITA_STORE.PROVINCE].find((p: any) => p.code == this.filter.provinceCode);
      if (province) {
        let provinceCode = province.code;
        this.getDistrictsByProvinceCode(provinceCode);
      }
    } else {
      this.getOrganizations();
    }
  }

  convertDataToExcel = (datas: any) => {
    let dataConverted = datas.map((item: any, i: number) => {
      let organizationModel = {};

      if (this.isSchool) {
        organizationModel = {
          'Số thứ thự': i + 1,
          'Tên đơn vị': item.name,
          'Trạng thái': item.status == 1 ? 'Đang hoạt động' : 'Dừng hoạt động',
          'Loại tài khoản': this.getNameData(item.centerTypeId, 'centerTypeId'),
          Gói: this.getNameData(item.packageId, 'packageId'),
          'Ngày tạo': this.date.transform(item.createdDate, 'dd/MM/yyy'),
          'Ngày kết thúc': item.dateEnd == 0 ? '' : this.date.transform(item.dateEnd * 1000, 'dd/MM/yyy'),
          Email: item.email,
          'Số điện thoại': item.phoneNumber,
          'Cán bộ quản lý': item.representName,
          'Địa chỉ': item.address,
          Tỉnh: item.province,
          'Số giáo viên đã cấp': item.quantityTeacher,
          'Giới hạn giáo viên': item.maxQuantityTeacher,
          'Số học sinh đã cấp': item.quantityStudent,
          'Học sinh kích hoạt': item.quantityStudentActived,
          'Giới hạn học sinh': item.maxQuantityStudent,
          'Triển khai chương trình KIDSenglish': item.programApplied,
        };
      } else {
        organizationModel = {
          'Số thứ thự': i + 1,
          'Tên đơn vị': item.name,
          'Trạng thái': item.status == 1 ? 'Đang hoạt động' : 'Dừng hoạt động',
          'Loại tài khoản': this.getNameData(item.centerTypeId, 'centerTypeId'),
          Gói: this.getNameData(item.packageId, 'packageId'),
          'Ngày tạo': this.date.transform(item.createdDate * 1000, 'dd/MM/yyy'),
          'Ngày kết thúc': item.dateEnd == 0 ? '' : this.date.transform(item.dateEnd * 1000, 'dd/MM/yyy'),
          Email: item.email,
          'Số điện thoại': item.phoneNumber,
          'Cán bộ quản lý': item.representName,
          'Địa chỉ': item.address,
          Tỉnh: item.province,
          'Số giáo viên đã cấp': item.quantityTeacher,
          'Giới hạn giáo viên': item.maxQuantityTeacher,
          'Số học sinh đã cấp': item.quantityStudent,
          'Học sinh kích hoạt': item.quantityStudentActived,
          'Giới hạn học sinh': item.maxQuantityStudent,
          'Triển khai chương trình KIDSenglish': item.programApplied,
        };
      }
      return organizationModel;
    });
    return dataConverted;
  };

  public exportExcel(): void {
    this.isLoading = true;
    this.organizationService.getDataForExcel(this.filter)
      .then((res: any) => {
        let datas = this.convertDataToExcel(res);
        const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(datas);
        const wb: XLSX.WorkBook = { Sheets: { data: ws }, SheetNames: ['data'] };
        const excelBuffer: any = XLSX.write(wb, {
          bookType: 'xlsx',
          type: 'array',
        });
        this.isLoading = false;
        this.cd.detectChanges();
        this.saveExcelFile(excelBuffer);
      })
      .catch((e) => {
        this.toastr.error('', 'Lấy danh sách thất bại !');
        this.isLoading = false;
        this.cd.detectChanges();
      });
  }

  private saveExcelFile(buffer: any): void {
    let fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const data: Blob = new Blob([buffer], { type: fileType });
    let fileName = this.isSchool ? 'Danh sách trường học' : 'Danh sách trung tâm';
    saveAs(data, fileName + '.xlsx');
  }

  dataChanged($event) {
    this.filter = {
      ...this.filter,
      page: $event.page,
      pageSize: $event.pageSize,
    };
    this.getOrganizations();
  }
  openModal = (modal: any, organizationId: number, type) => {
    this.organization = this.objectDataTable.datas.find((d: any, i: any) => {
      return d.id == organizationId;
    });
    if (type != 'kidsenglish') {
      if (!this.isLoadProgram || this.organization.centerId == 0) return;
      this.organizationService
        .getItemById('organizations', organizationId)
        .then((res: any) => {
          let data = [];
          if (res.organization?.listPrograms?.length > 0) {
            let listId = ',' + res.organization?.listPrograms.map((t: any) => t.id).join(',') + ',';
            data = this.programs.map((r: any) => ({
              ...r,
              selected: listId.includes(',' + r.id + ','),
              isDisabled: listId.includes(',' + r.id + ','),
            }));
          } else {
            data = this.programs.map((x) => ({ ...x }));
          }
          this.configDua = {
            list: data || [],
            value: 'id',
            availableTitle: 'Danh sách chương trình',
            selectedTitle: 'Danh sách chương trình được chọn',
            addButtonText: 'Thêm',
            removeButtonText: 'Xoá',
            addAllButtonText: 'Thêm tất cả',
            removeAllButtonText: 'Xoá tất cả',
            searchPlaceholder: 'Tìm kiếm chương trình',
            text: 'name',
          };
          this.modalService.open(modal, {
            size: 'lg',
            backdrop: 'static',
          });
        })
        .catch(() => {
          this.toastr.error('', 'Vui lòng thủ lại');
        });
    } else {
      this.modalService.open(modal, {
        size: 'lg',
        backdrop: 'static',
      });
    }
  };

  acceptApplyKidsenglish(representInfoModal) {
    this.isSubmitted = true;
    this.organizationService
      .applyKidsenglish(this.organization.id)
      .then((res: any) => {
        this.getOrganizations();
        this.representSchool = res;
        this.closeModalRepresentInfo();
        this.modalService.open(representInfoModal, {
          size: 'lg',
        });
        this.isSubmitted = false;
        this.toastr.success('', 'Triển khai KidsEnglish thành công');
      })
      .catch((e) => {
        this.toastr.error('', 'Triển khai KidsEnglish thất bại');
        this.isSubmitted = false;
        this.cd.detectChanges();
      });
  }

  activeCenter(organization) {
    this.isSubmitted = true;
    this.organizationService
      .activeCenter({ centerId: organization.id, status: organization.status })
      .then((res: any) => {
        this.toastr.success('', 'Thay đổi trạng thái trung tâm thành công');
        this.getOrganizations();
      })
      .catch((e) => {
        this.toastr.error('', e.error);
      });
  }

  acceptApplyProgram() {
    let listProgramId = this.obj.selected.map((e: any) => e.dataset.id).join(',');
    this.isSubmitted = true;
    this.organizationService
      .post('organizations/assign', { listProgramId, schoolId: this.organization.id })
      .then((res: any) => {
        this.getOrganizations();
        this.isSubmitted = false;
        this.closeModalRepresentInfo();
        this.toastr.success('', 'Triển khai chương trình học thành công');
      })
      .catch((e) => {
        this.isSubmitted = false;
        this.toastr.error('', 'Triển khai chương trình học thất bại');
        this.cd.detectChanges();
      });
  }

  closeModalRepresentInfo() {
    this.modalService.dismissAll();
  }

  setObj(event: any) {
    this.obj = event.data;
  }

  closeModal(organization, type) {
    if (type == 'kidsenglish') {
      var org = this.objectDataTable.datas.find((o) => o.id == organization.id);
      org.centerId = 0;
      this.cd.detectChanges();
    }
    this.closeModalRepresentInfo();
  }
  getNameData(id, type) {
    if (type == 'centerTypeId') {
      let result = this.accountTypes.find((x) => id == x.id) || {};
      return result.name || 'N/A';
    } else {
      let result = this.packages.find((x) => id == x.id) || {};
      return result.name || 'N/A';
    }
  }

  resetPassword(id) {
    this.organizationService.resetPassword(id)
      .then((res: any) => {
        if (res) {
          this.toastr.success('', 'Thay đổi về mật khẩu mặc dịnh');
        }
      })
      .catch((e) => {
        this.toastr.error('', 'Thất bại');
      });
  }
}
