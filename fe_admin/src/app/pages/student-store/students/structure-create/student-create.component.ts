import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AKITA_STORE } from 'src/app/containers/constants';
import { FormCanDeactivate } from 'src/app/containers/guards/can-deactivate/can-deactivate';
import { StudentService } from 'src/app/containers/services/student.service';
import { OptionQuery } from 'src/app/store/option/optionQuery';

@Component({
  selector: 'app-student-create',
  templateUrl: './student-create.component.html',
})
export class StudentCreateComponent extends FormCanDeactivate implements OnInit {
  isSubmitted: boolean;
  years: any = [];
  provinces: any = [];
  dataObject: any = {
    yearId: 1,
    provinceCode: '',
    accountNumber: ''
  };

  id: number;

  constructor(
    private studentService: StudentService,
    private router: Router,
    private optionQuery: OptionQuery,
    private toastr: ToastrService
  ) {
    super();
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
      this.years = options[AKITA_STORE.YEAR];
      this.provinces = options[AKITA_STORE.PROVINCE];
      this.dataObject.yearId = this.years[0].id;
      this.dataObject.provinceCode = this.provinces[0].code;
    }
  };
  save() {
    this.isSubmitted = true;
    this.studentService
      .create(this.dataObject)
      .then(() => {
        this.router.navigate(['/students']);
        this.toastr.success('Tạo danh sách học sinh thành công');
      })
      .catch((e) => {
        this.isSubmitted = false;
        this.toastr.error('Tạo danh sách học sinh thất bại');
      });
  }

}
