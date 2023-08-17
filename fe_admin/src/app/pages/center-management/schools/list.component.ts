import { Component, ChangeDetectorRef, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/containers/services/auth/auth.service';
import { OrganizationService } from 'src/app/containers/services/organization.service';
import { AKITA_STORE, GENERAL_ERROR_MESSAGE, HTTP_RESPONSE_TYPE, IMPLEMENT_TYPE, SCHOOL_IMPLEMENTATION_TYPE, SCHOOL_TYPE } from 'src/app/containers/constants';
import { CommonModalComponent } from 'src/app/modules/SharedModule/modal/modal.component';
import { ToastrService } from 'ngx-toastr';
import { OptionQuery } from 'src/app/store/option/optionQuery';
import { DistrictService } from 'src/app/containers/services/district.service';
import { Router } from '@angular/router';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-teacher-list',
  templateUrl: './list.component.html',
})
export class SchoolListComponent {
  @ViewChild('confirmationModal')
  private modalComponent!: CommonModalComponent;

  private ORGANIZATION = 'organizations';
  private currentUser: any;
  isLoading = false;
  filter: any = {
    searchTerm: '',
    type: 2,
    status: 0,
    centerId: 0,
    provinceCode: '0',
    districtCode: 0,
  };

  removeSchoolKey = 'RemoveSchoolKey';
  implementType = IMPLEMENT_TYPE;
  objectDataTable: any = {
    datas: [],
    headers: [
      {
        key: 'name',
        value: 'Tên trường',
        width: '10%',
      },
      {
        key: 'provinceName',
        value: 'Tỉnh/Thành phố',
        width: '10%',
      },
      {
        key: 'districtName',
        value: 'Quận/Huyện',
        width: '9%',
      },
      {
        key: 'emailOfRepresentation',
        value: 'Email',
        width: '10%',
      },
    ],
  };

  options: Array<any> = [];
  provinces: Array<any> = [];
  districts: Array<any> = [];

  $SCHOOL_IMPLEMENTATION_TYPE = SCHOOL_IMPLEMENTATION_TYPE;

  constructor(
    private optionQuery: OptionQuery,
    private auth: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private cd: ChangeDetectorRef,
    private organizationService: OrganizationService,
    private districtService: DistrictService
  ) {
    this.auth.currentUserSubject.asObservable().subscribe((res) => {
      this.currentUser = res;
      this.filter.centerId = this.currentUser?.organization?.id;
    });
  }

  getAllSchools = (returnMessage: string = '') => {
    this.organizationService
      .getAllSchools(this.filter.searchTerm, this.filter.provinceCode, this.filter.districtCode)
      .then((res: any) => {
        this.objectDataTable.datas = res;
        this.cd.detectChanges();

        if (returnMessage) {
          this.toastr.success('', returnMessage);
        }
      })
      .catch((e: any) => { });
  };

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
      this.provinces = options[AKITA_STORE.PROVINCE];
      this.filter.provinceCode = '0';

      if (this.filter.provinceCode) {
        this.getDistrictsByProvinceCode(this.filter.provinceCode);
      }
    }
  };

  getDistrictsByProvinceCode(provinceCode) {
    if (provinceCode == 0 || provinceCode == '0') {
      this.filter.districtCode = 0;
      this.getAllSchools();
    } else {
      this.districtService.getByProvinceCode(provinceCode).then((res: any) => {
        if (!res) {
          this.toastr.error('', GENERAL_ERROR_MESSAGE);
          this.cd.detectChanges();
        }

        if (res.status == HTTP_RESPONSE_TYPE.SUCCESS) {
          this.districts = res.returnData;
          this.filter.districtCode = 0;
          this.getAllSchools();
        } else {
          this.toastr.error('', res.message);
          this.cd.detectChanges();
        }
      });
    }
  }

  async openModal(values, title: string, text: string) {
    return await this.modalComponent.openConfirmationModal(values, title, text);
  }

  async openDeleteConfirmationModal(values, title: string, text: string) {
    return await this.modalComponent.openDeleteConfirmationModal(values, title, text);
  }

  changeImplementationType(school, $event) {
    var values = {
      school: school,
      previousImplementationType: school.implementType,
    };

    var title = `Xác nhận phương thức triển khai cho "${school.provinceName} / ${school.districtName} / ${school.name}"`;
    let text = 'Phương thức triển khai: ' + ($event == SCHOOL_IMPLEMENTATION_TYPE.ALL ? 'Triển khai toàn bộ' : 'Cho thuê giáo viên');
    this.openModal(values, title, text);
  }

  changeFilter($event, type: any) {
    var dropdownValue = $event.target.value;
    if (type == 'provinceCode') {
      if (dropdownValue == '0') {
        this.filter.districtCode = 0;
        this.districts = [];
        this.getAllSchools();
      } else {
        let province = this.options[AKITA_STORE.PROVINCE].find((p: any) => p.code == this.filter.provinceCode);
        if (province) {
          let provinceCode = province.code;
          if (provinceCode) {
            this.getDistrictsByProvinceCode(provinceCode);
          }
        }
      }
    } else {
      this.getAllSchools();
    }
  }

  getConfirmationValue($event) {
    var values = $event.values;

    if (values.confirmationType == this.removeSchoolKey) {
      var schoolId = $event.values.schoolId;
      var schoolName = $event.values.schoolName;

      if ($event.result == 'Confirm') {
        this.organizationService
          .deleteSchool(schoolId)
          .then(() => {
            this.getAllSchools('Xoá trường học "' + schoolName + '" thành công.');
          })
          .catch((e) => {
            this.toastr.error('', e.error || e.error.Message);
          });
      }
    } else {
      var currentSchool = $event.values.school;
      let model = { schoolId: currentSchool.id, implementType: currentSchool.implementType };
      var previousImplementationType = $event.values.previousImplementationType;

      if ($event.result == 'Confirm') {
        this.organizationService
          .post(this.ORGANIZATION + '/implement', model)
          .then(() => {
            this.getAllSchools('Thay đổi thông tin trường học "' + currentSchool.name + '" thành công.');
          })
          .catch(() => {
            var school = this.objectDataTable.datas.find((school) => school.id == currentSchool.id);
            if (school) {
              school.implementType = previousImplementationType;
              this.cd.detectChanges();
            }
            this.toastr.error('', 'Triển khai trường học thất bại!');
          });
      } else {
        var school = this.objectDataTable.datas.find((school) => school.id == currentSchool.id);
        if (school) {
          school.implementType = previousImplementationType;
          this.cd.detectChanges();
        }
      }
    }
  }

  removeSchool(school) {
    let values = {
      schoolId: school.id,
      schoolName: school.name,
      confirmationType: this.removeSchoolKey,
    };

    this.openDeleteConfirmationModal(values, 'Xoá trường học', 'Bạn có muốn xoá trường học "' + school.name + '" không?');
  }
  implement(id, type) {
    this.router.navigateByUrl('/center-management/schools/implement/' + id, {
      state: { type },
    });
  }
  convertDataToExcel = (datas: any) => {
    let dataConverted = datas.map((item: any, i: number) => {
      return {
        'Tên trường': item.name,
        'Mã trường': item.code,
        'Tỉnh thành': item.province,
        'Quận huyện': item.district,
        'Số lớp': item.classCount,
        'Số học sinh': item.studentCount
      };
    });
    return dataConverted;
  };

  public exportExcel(): void {
    this.isLoading = true;
    let model = {
      type: SCHOOL_TYPE,
      centerId: this.filter.centerId
    }
    debugger
    this.organizationService.getDataForExcel(model)
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
    saveAs(data, 'Danh sách trường học' + '.xlsx');
  }
}
