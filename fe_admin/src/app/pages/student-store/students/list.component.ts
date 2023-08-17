import { AKITA_STORE, STUDENT_STATUS } from './../../../containers/constants/index';
import { Component, ChangeDetectorRef } from '@angular/core';
import { StudentService } from 'src/app/containers/services/student.service';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { environment } from 'src/environments/environment';
import { OptionQuery } from 'src/app/store/option/optionQuery';
import { ShareService } from 'src/app/containers/services/share/share.service';

@Component({
  selector: 'app-structure-list',
  templateUrl: './list.component.html',
})
export class StudentListComponent {
  dataPaging: any = {
    pageSize: 0,
    totalItems: 0,
    page: 0,
    datas: [],
  };
  accountTypes: any = [];
  provinces: any = [];

  status: any = STUDENT_STATUS;

  objectDataTable: any = {
    datas: [],
    headers: [
      {
        key: 'code',
        value: 'Mã học sinh',
      },
      {
        key: 'centerName',
        value: 'Tên trung tâm',
      }, {
        key: 'yearId',
        value: 'Năm học',
      },
      {
        key: 'provinceName',
        value: 'Tỉnh',
      },
      {
        key: 'centerTypeId',
        value: 'Kiểu tài khoản',
      },
      {
        key: 'createdDate',
        value: 'Ngày tạo',
      },
    ],
  };

  filter: any = {
    provinceCode: '',
    accountType: 0,
    status: 0,
    page: 1,
    yearId: 0,
    pageSize: 10,
  };
  centers: any = [];
  years: any = [];
  constructor(
    public studentService: StudentService,
    private optionQuery: OptionQuery,
    public sharedService: ShareService,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadOption();
    this.status = Object.keys(this.status).map((key) => {
      return {
        id: key,
        name: this.status[key],
      };
    });
  }

  loadOption() {
    let options$ = this.optionQuery.selectAll();
    options$.subscribe((options) => {
      this.setInitialValues(options);
    });
  }

  setInitialValues = (options: any) => {
    if (options.length > 0) {
      this.accountTypes = options[AKITA_STORE.ACCOUNT_TYPE];
      this.provinces = options[AKITA_STORE.PROVINCE];
      this.years = options[AKITA_STORE.YEAR];
      this.filter.provinceCode = this.provinces[0].code;
      this.getStudents(this.filter);
      this.cd.detectChanges();
    }
  };

  getYearName = (yearId) => {
    let yearName = this.years.find(x => x.id == yearId)?.name || "";
    return yearName;
  }
  getStudents = (param) => {
    this.studentService
      .getStudentStore(param)
      .then((res: any) => {
        this.objectDataTable.datas = res.datas.map((item) => {
          return { ...item, yearName: this.getYearName(item.yearId) };
        });
        this.dataPaging = res;
        this.cd.detectChanges();
      })
      .catch((e) => { });
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

  convertDataToExcel = (datas: any) => {
    let url = environment.urlActiveStudent;
    let dataConverted = datas.map((item: any, i: number) => {
      return {
        'Số thứ tự': i + 1,
        'Mã tỉnh thành': item.provinceCode,
        'Tên tỉnh thành': item.provinceName,
        'Trạng thái': STUDENT_STATUS[item.status],
        'Kiểu tài khoản': this.getAccountType(item.accountTypeId),
        'Mã học sinh': item.code,
        Url: url + '/' + item.code,
      };
    });
    return dataConverted;
  };

  private saveExcelFile(buffer: any): void {
    let fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const data: Blob = new Blob([buffer], { type: fileType });
    saveAs(data, 'Danh sách học sinh' + '.xlsx');
  }

  getAccountType(id) {
    let type = '';
    this.accountTypes.forEach((item) => {
      if (item.id == id) {
        type = item.name;
      }
    });
    return type;
  }

  changeFilter = () => {
    this.getStudents({ ...this.filter, page: 1 });
  };

  dataChanged($event) {
    this.filter = {
      ...this.filter,
      page: $event.page,
      pageSize: $event.pageSize,
    };
    this.getStudents(this.filter);
  }
}
