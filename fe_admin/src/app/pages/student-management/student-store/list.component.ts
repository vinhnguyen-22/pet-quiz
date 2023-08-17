import { AKITA_STORE, STUDENT_STATUS } from '../../../containers/constants/index';
import { ShareService } from '../../../containers/services/share/share.service';
import { StudentService } from 'src/app/containers/services/student.service';
import { Component, ChangeDetectorRef } from '@angular/core';
import { OptionQuery } from 'src/app/store/option/optionQuery';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-student-store',
  templateUrl: './list.component.html',
})
export class StudentStoreComponent {
  accountTypes: any = [];
  provinces: any = [];
  dataPaging: any = {
    pageSize: 0,
    totalItems: 0,
    page: 0,
    datas: [],
  };
  filter: any = {
    provinceCode: '',
    accountType: 0,
    status: 1,
    page: 1,
    yearId: 0,
    pageSize: 10,
  };
  status: any = STUDENT_STATUS;

  objectDataTable: any = {
    datas: [],
    headers: [
      {
        key: 'code',
        value: 'Mã học sinh',
      },
      {
        key: 'provinceName',
        value: 'Tỉnh',
      },
      {
        key: 'centerTypeId',
        value: 'Kiểu tài khoản',
      },
    ],
  };

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
      this.getStudents(this.filter);
      this.cd.detectChanges();
    }
  };

  getStudents = (param) => {
    this.studentService
      .getStudentStore(param)
      .then((res: any) => {
        this.dataPaging = res;
        this.objectDataTable.datas = res.datas;
        this.cd.detectChanges();
      })
      .catch((e) => { });
  };

  getProvinceName(provinceId) {
    let name = '';
    this.provinces.forEach((p) => {
      if (p.id == provinceId) {
        name = p.name;
      }
    });
    return name;
  }

  convertDataToExcel = (datas: any) => {
    let dataConverted = datas.map((item: any, i: number) => {
      return {
        'Số thứ tự': i + 1,
        'Mã học sinh': item.code,
      };
    });
    return dataConverted;
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
    saveAs(data, 'Danh sách học sinh' + '.xlsx');
  }

  dataChanged($event) {
    this.filter = {
      ...this.filter,
      page: $event.page,
      pageSize: $event.pageSize,
    };
    this.getStudents(this.filter);
  }
}
