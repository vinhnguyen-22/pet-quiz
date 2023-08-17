import { DATE_FORMAT } from './../../../containers/constants/index';
import { AKITA_STORE, STUDENT_STATUS } from '../../../containers/constants/index';
import { ShareService } from '../../../containers/services/share/share.service';
import { StudentService } from 'src/app/containers/services/student.service';
import { Component, ChangeDetectorRef } from '@angular/core';
import { OptionQuery } from 'src/app/store/option/optionQuery';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { OrganizationService } from 'src/app/containers/services/organization.service';
import { Router } from '@angular/router';
import { ClassService } from 'src/app/containers/services/class.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-student-list',
  templateUrl: './list.component.html',
})
export class StudentsListComponent {
  isLoading = false
  classes: any = [];
  accountTypes: any = [];
  provinces: any = [];
  years = [];
  schools = [];
  dataPaging: any = {
    pageSize: 0,
    totalItems: 0,
    page: 0,
    datas: [],
  };
  filter: any = {
    schoolId: 0,
    classId: 0,
    page: 1,
    name: "",
    yearId: 0,
    pageSize: 10,
    searchTerm: ""
  };
  grades = [];
  status: any = STUDENT_STATUS;

  objectDataTable: any = {
    datas: [],
    headers: [
      {
        key: 'code',
        value: 'Mã học sinh',
      },
      {
        key: 'name',
        value: 'Họ tên',
      },
      {
        key: 'dob',
        value: 'Ngày sinh',
      }, {
        key: "gender",
        value: "Giới tinh"
      }, {
        key: "parentName",
        value: "Phụ huynh"
      },
      {
        key: "phoneNumber",
        value: "Số điện thoại"
      }, {
        key: "className",
        value: "Lớp"
      }
    ],
  };

  constructor(
    public studentService: StudentService,
    private optionQuery: OptionQuery,
    public sharedService: ShareService,
    private organizationService: OrganizationService,
    private cd: ChangeDetectorRef,
    public router: Router,
    private classService: ClassService,
    private date: DatePipe
  ) {

  }

  ngOnInit(): void {
    this.getSchool();
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
      this.years = [...options[AKITA_STORE.YEAR]];
      this.grades = options[AKITA_STORE.GRADE];
      this.getStudents(this.filter);
      this.cd.detectChanges();
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
        this.getClasses();
        this.cd.detectChanges();
      })
      .catch((e: any) => { });
  };

  getClasses = () => {
    if (this.filter.schoolId) {
      this.classService
        .getClassLabel(this.filter.schoolId)
        .then((res: any) => {
          this.classes = res;
          this.cd.detectChanges();
        })
        .catch((e: any) => { });
    }

  };

  getStudents = (param) => {
    this.studentService
      .getStudentList(param)
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

  dataChanged($event) {
    this.filter = {
      ...this.filter,
      page: $event.page,
      pageSize: $event.pageSize,
    };
    this.getStudents(this.filter);
  }

  changeFilter = (type) => {
    if (type == "SCHOOL") {
      this.getClasses();
    }
    this.getStudents(this.filter);
  };


  convertDataToExcel = (students: any) => {
    let dataConverted = students.map((item: any, i: number) => {
      return {
        'Mã học sinh': item.code,
        'Họ tên': item.name,
        'Giới tính': item.gender ? "Nam" : "Nữ",
        'Ngày sinh': this.date.transform(item.dob, DATE_FORMAT),
        'Họ tên phụ huynh': item.parentName,
        'Sdt phụ huynh': item.phoneNumber,
        'Lớp học': item.className
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
