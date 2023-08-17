import { Observable } from 'rxjs';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClassService } from 'src/app/containers/services/class.service';
import { ShareService } from 'src/app/containers/services/share/share.service';
import { FormBuilder, Validators } from '@angular/forms';
import { StudentService } from 'src/app/containers/services/student.service';
import { ToastrService } from 'ngx-toastr';
import { FormCanDeactivate } from 'src/app/containers/guards/can-deactivate/can-deactivate';
import { AKITA_STORE, GENERAL_ERROR_MESSAGE, HTTP_RESPONSE_TYPE, REGEX_PN } from 'src/app/containers/constants';
import { DistrictService } from 'src/app/containers/services/district.service';
import { WardService } from 'src/app/containers/services/ward.service';
import { OptionQuery } from 'src/app/store/option/optionQuery';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
})
export class AddStudentComponent extends FormCanDeactivate implements OnInit {
  isSubmitted: boolean;
  isCodeValid: boolean = true;
  student: any = {
    gender: true,
    name: '',
    provinceCode: '',
    wardCode: '',
    districtCode: '',
    dob: new Date().toISOString().split('T')[0],
    phoneNumber: '',
    parentName: '',
  };
  classInfo: any = {};

  provinces: any = [];
  districts: any = [];
  wards: any = [];
  _wards: any = [];
  studentForm: any;
  classId: number = 0;
  options: any;
  constructor(
    private cd: ChangeDetectorRef,
    private router: Router,
    private classService: ClassService,
    private shareService: ShareService,
    public optionQuery: OptionQuery,
    private fb: FormBuilder,
    private districtService: DistrictService,
    private wardService: WardService,
    private toastr: ToastrService,
    private studentService: StudentService,
    private actRoute: ActivatedRoute
  ) {
    super();
    this.classId = this.actRoute.snapshot.params['id'];
    this.getClassDetail(this.classId);
  }

  ngOnInit(): void {
    this.loadOption();
  }

  loadForm() {
    this.studentForm = this.fb.group({
      name: [this.student.name, Validators.compose([Validators.required])],
      address: [this.student.address],
      gender: [this.student.gender],
      provinceCode: [this.student.provinceCode],
      districtCode: [this.student.districtCode],
      wardCode: [this.student.wardCode],
      dob: [this.student.dob, Validators.required],
      phoneNumber: [this.student.phoneNumber, Validators.compose([Validators.pattern(REGEX_PN)])],
      parentName: [this.student.parentName],
    });
    this.cd.detectChanges();
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
      this.loadForm();
    }
  };

  canDeactivate(): boolean {
    return this.isSubmitted;
  }

  getClassDetail = (classId) => {
    this.classService
      .getClassDetail(classId)
      .then((res: any) => {
        this.classInfo = res.commonInfo.classInfo;
        this.cd.detectChanges();
      })
      .catch((e) => {});
  };

  addStudent = () => {
    this.isSubmitted = true;
    let model = { ...this.student, ...this.studentForm.value, classId: this.classId, code: '' };
    this.studentService
      .addToClass(model)
      .then((res: any) => {
        if (res) {
          this.student.code = '';
          this.toastr.success('', 'Thêm học sinh thành công');
          this.loadForm();
        } else {
          this.toastr.error('', 'Thêm học sinh thất bại');
        }
      })
      .catch((e) => {
        this.toastr.error('', e.error.Message);
      });
    this.isSubmitted = false;
    this.cd.detectChanges();
  };

  controlHasError(validation: string, controlName: string) {
    let control = this.studentForm.controls[controlName];
    return control.hasError(validation) && (control.dirty || control.touched);
  }

  isControlValid(controlName: string): boolean {
    let control = this.studentForm.controls[controlName];
    return control.valid && (control.dirty || control.touched);
  }

  isControlInvalid(controlName: string): boolean {
    let control = this.studentForm.controls[controlName];
    return control.invalid && (control.dirty || control.touched);
  }
  back() {
    let organId = this.classInfo.organizationId;
    this.router.navigateByUrl('/center-management/classes', {
      state: { organId },
    });
  }
  handleChangeAddress = (event: any, type: any) => {
    this.changeAddress(event.target.value, type);
  };
  changeAddress = (id: any, type: any) => {
    if (type == 'province') {
      var provinceCode = id;
      this.getDistrictsByProvinceCode(provinceCode, true);
    } else {
      var districtCode = id;
      this.getWardsByDistrictCode(districtCode, true);
    }
  };
  getDistrictsByProvinceCode(provinceCode, isHandlingFilter) {
    this.districtService
      .getByProvinceCode(provinceCode)
      .then((res: any) => {
        if (!res) {
          this.toastr.error('', GENERAL_ERROR_MESSAGE);
          this.cd.detectChanges();
        }
        if (res.status == HTTP_RESPONSE_TYPE.SUCCESS) {
          this.districts = res.returnData;
          if (this.districts.length > 0) {
            let firstDistrict = this.districts[0];
            let firstDistrictCode = firstDistrict.code;
            if (isHandlingFilter) {
              this.studentForm.controls['districtCode'].setValue(firstDistrictCode);
              this.getWardsByDistrictCode(firstDistrictCode, isHandlingFilter);
            }
          } else {
            this.studentForm.controls['districtCode'].setValue('');
            this.studentForm.controls['wardCode'].setValue('');
          }
        } else {
          this.toastr.error('', res.message);
          this.cd.detectChanges();
        }
      })
      .catch((e) => {
        this.toastr.error('', e.error);
        this.cd.detectChanges();
      });
  }

  getWardsByDistrictCode(districtCode, isHandlingFilter) {
    this.wardService
      .getByDistrictCode(districtCode)
      .then((res: any) => {
        if (!res) {
          this.toastr.error('', GENERAL_ERROR_MESSAGE);
        }
        if (res.status == HTTP_RESPONSE_TYPE.SUCCESS) {
          this.wards = res.returnData;
          if (this.wards.length > 0) {
            if (isHandlingFilter) {
              var firstwardCode = this.wards[0]?.code;
              this.studentForm.controls['wardCode'].setValue(firstwardCode);
            }
          } else {
            this.studentForm.controls['wardCode'].setValue('');
          }
        }

        this.cd.detectChanges();
      })
      .catch((e) => {
        this.toastr.error('', e.error);
        this.cd.detectChanges();
      });
  }
}
