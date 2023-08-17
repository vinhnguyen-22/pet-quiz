import { AKITA_STORE, GENERAL_ERROR_MESSAGE, HTTP_RESPONSE_TYPE, REGEX_NUMBER_LARGER_THAN_0 } from '../../../../containers/constants/index';
import { Component, ChangeDetectorRef, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { OrganizationService } from 'src/app/containers/services/organization.service';
import KTWizard from '../../../../../assets/js/components/wizard.js';
import { KTUtil } from '../../../../../assets/js/components/util';
import { OptionQuery } from 'src/app/store/option/optionQuery';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { STATUSES, REGEX_PN } from 'src/app/containers/constants';
import { ProgramService } from 'src/app/containers/services/program.service';
import { ToastrService } from 'ngx-toastr';
import { DistrictService } from 'src/app/containers/services/district.service';
import { AuthService } from 'src/app/containers/services/auth/auth.service';

@Component({
  selector: 'app-school-edit',
  templateUrl: './school-edit.component.html',
})
export class SchoolEditComponent {
  @Output('setSubmitted') setSubmitted: any = new EventEmitter<any>();
  isSubmitted: boolean;
  @ViewChild('wizard', { static: true }) el: ElementRef;
  private ORGANIZATIONS = 'organizations';
  packages: any = [];
  accountTypes: any = [];
  EMPTY_ORGANIZATION = {
    organization: {
      id: 0,
      name: '',
      phoneNumber: '',
      email: '',
      taxCode: '',
      address: '',
      status: 1,
      provinceCode: 0,
      districtCode: 0,
      description: '',
      listSchoolId: '',
      type: 2,
      centerId: 1,
      implementType: 0,
    },
    represent: {
      id: 0,
      name: '',
      position: '',
      phoneNumber: '',
      email: '',
    },
  };
  status: any = STATUSES;
  organForm: FormGroup;
  representForm: FormGroup;
  wizard: any;
  id: number;
  provinces: any = [];
  options: any = [];
  districts: any = [];
  wards: any = [];
  objDetail: any = this.EMPTY_ORGANIZATION;
  currentUser: any;
  ENABLE_EDITING = false;

  constructor(
    private organizationService: OrganizationService,
    private router: Router,
    private cd: ChangeDetectorRef,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private optionQuery: OptionQuery,
    public programService: ProgramService,
    private route: ActivatedRoute,
    private districtService: DistrictService,
    private authService: AuthService
  ) {
    this.currentUser = this.authService.currentUserValue;
  }

  ngAfterViewInit(): void {
    this.wizard = new KTWizard(this.el.nativeElement, {
      startStep: 1,
    });

    this.wizard.on('beforeNext', (wizardObj) => { });

    this.wizard.on('change', () => {
      setTimeout(() => {
        KTUtil.scrollTop();
      }, 500);
    });
  }

  ngOnInit(): void {
    this.ENABLE_EDITING = this.authService.isAdmin();
    this.loadOption();
  }

  loadOrganization() {
    this.route.paramMap
      .pipe(
        switchMap((params) => {
          this.id = Number(params.get('id'));
          if (this.id || this.id > 0) {
            return this.organizationService.getItemById(this.ORGANIZATIONS, this.id);
          }
          return of(this.EMPTY_ORGANIZATION);
        }),
        catchError((errorMessage) => {
          return of(undefined);
        })
      )
      .subscribe((res: any) => {
        if (!res) {
          this.router.navigate(['/schools'], { relativeTo: this.route });
        }
        this.objDetail = res;
        if (this.id == 0) {
          if (this.provinces.length > 0 && this.objDetail.organization.provinceCode == 0) {
            this.objDetail.organization.provinceCode = this.provinces[0].code;
          }
          if (this.accountTypes && this.accountTypes.length > 0) {
            this.objDetail.organization.centerTypeId = this.accountTypes[0].id;
          }
          if (this.packages && this.packages.length > 0) {
            this.objDetail.organization.packageId = this.packages[0].id;
          }

          this.getLastId();
          this.loadDistricts(this.objDetail.organization.provinceCode, true);
        } else {
          this.loadDistricts(this.objDetail.organization.provinceCode, false);
        }
        this.loadForm();
      });
  }

  loadForm() {
    if (!this.objDetail.organization && this.objDetail.represent) {
      return;
    }
    this.organForm = this.fb.group({
      name: [
        {
          value: this.objDetail.organization.name,
          disabled: !this.ENABLE_EDITING,
        },
        Validators.compose([Validators.required]),
      ],
      implementType: [this.objDetail.organization.implementType],
      phoneNumber: [
        {
          value: this.objDetail.organization.phoneNumber,
          disabled: !this.ENABLE_EDITING,
        },
        Validators.compose([Validators.pattern(REGEX_PN)]),
      ],
      email: [
        {
          value: this.objDetail.organization.email,
          disabled: !this.ENABLE_EDITING,
        },
        Validators.compose([Validators.email]),
      ],
      provinceCode: [
        {
          value: this.objDetail.organization.provinceCode,
          disabled: !this.ENABLE_EDITING,
        },
        Validators.compose([Validators.required]),
      ],
      districtCode: [
        {
          value: this.objDetail.organization.districtCode,
          disabled: !this.ENABLE_EDITING,
        },
        Validators.compose([Validators.required]),
      ],
      description: [
        {
          value: this.objDetail.organization.description,
          disabled: !this.ENABLE_EDITING,
        },
      ],
      code: [
        {
          value: this.objDetail.organization.code,
          disabled: !this.ENABLE_EDITING,
        },
        Validators.compose([Validators.required]),
      ],
      address: [
        {
          value: this.objDetail.organization.address,
          disabled: !this.ENABLE_EDITING,
        },
      ],
      id: [
        {
          value: this.objDetail.organization.id,
          disabled: !this.ENABLE_EDITING,
        },
      ],
      type: [
        {
          value: this.objDetail.organization.type,
          disabled: !this.ENABLE_EDITING,
        },
      ],
      status: [
        {
          value: this.objDetail.organization.status,
          disabled: !this.ENABLE_EDITING,
        },
      ],
      maximumTeacherQuantity: [
        {
          value: this.objDetail.organization.maximumTeacherQuantity,
          disabled: !this.ENABLE_EDITING,
        },
        Validators.compose([Validators.required, Validators.pattern(REGEX_NUMBER_LARGER_THAN_0)]),
      ],
      centerTypeId: [
        {
          value: this.objDetail.organization.centerTypeId,
          disabled: !this.ENABLE_EDITING,
        },
        Validators.compose([Validators.required]),
      ],
      packageId: [
        {
          value: this.objDetail.organization.packageId,
          disabled: !this.ENABLE_EDITING,
        },
        Validators.compose([Validators.required]),
      ],
      maximumStudentQuantity: [
        {
          value: this.objDetail.organization.maximumStudentQuantity,
          disabled: !this.ENABLE_EDITING || this.objDetail.organization.id,
        },
        Validators.compose([Validators.required, Validators.pattern(REGEX_NUMBER_LARGER_THAN_0)]),
      ],
      maximumLessonQuantity: [
        {
          value: this.objDetail.organization.maximumLessonQuantity,
          disabled: !this.ENABLE_EDITING,
        },
        Validators.compose([Validators.required, Validators.pattern(REGEX_NUMBER_LARGER_THAN_0)]),
      ],
    });
    this.representForm = this.fb.group({
      name: [
        {
          value: this.objDetail.represent.name,
          disabled: !this.ENABLE_EDITING,
        },
        Validators.compose([Validators.required]),
      ],
      position: [
        {
          value: this.objDetail.represent.position,
          disabled: !this.ENABLE_EDITING,
        },
      ],
      email: [
        {
          value: this.objDetail.represent.email,
          disabled: !this.ENABLE_EDITING,
        },
        Validators.compose([Validators.required, Validators.email]),
      ],
      phoneNumber: [
        {
          value: this.objDetail.represent.phoneNumber,
          disabled: !this.ENABLE_EDITING,
        },
        Validators.compose([Validators.pattern(REGEX_PN)]),
      ],
      id: [this.objDetail.represent.id || 0],
    });
    this.cd.detectChanges();
  }

  isControlValid(form: string, controlName: string): boolean {
    let control;
    if (form == 'organ') {
      control = this.organForm.controls[controlName];
    } else {
      control = this.representForm.controls[controlName];
    }
    return control.valid && (control.dirty || control.touched);
  }

  isControlInvalid(form: string, controlName: string): boolean {
    let control;
    if (form == 'organ') {
      control = this.organForm.controls[controlName];
    } else {
      control = this.representForm.controls[controlName];
    }
    return control.invalid && (control.dirty || control.touched);
  }

  controlHasError(form: string, validation: string, controlName: string) {
    let control;
    if (form == 'organ') {
      control = this.organForm.controls[controlName];
    } else {
      control = this.representForm.controls[controlName];
    }
    return control.hasError(validation) && (control.dirty || control.touched);
  }

  loadOption() {
    let options$ = this.optionQuery.selectAll();
    options$.subscribe((options) => {
      this.setInitialValues(options);
    });
  }

  setInitialValues = (options: any) => {
    if (options.length > 0) {
      this.options = options;
      this.provinces = options[AKITA_STORE.PROVINCE];
      var provinceCode = this.provinces[0].code;
      this.packages = options[AKITA_STORE.PACKAGE];
      this.accountTypes = options[AKITA_STORE.ACCOUNT_TYPE];
      this.loadDistricts(provinceCode, false);
      this.loadOrganization();
    }
  };

  loadDistricts(provinceCode, isFilter) {
    this.districtService
      .getByProvinceCode(provinceCode)
      .then((res: any) => {
        if (!res) {
          this.toastr.error('', GENERAL_ERROR_MESSAGE);
          this.cd.detectChanges();
        }
        if (res.status == HTTP_RESPONSE_TYPE.SUCCESS) {
          this.districts = res.returnData;
          if (this.organForm && isFilter) {
            this.organForm.controls['districtCode'].setValue(this.districts[0].code || '');
          }
        } else {
          this.toastr.error('', res.message);
        }
        this.cd.detectChanges();
      })
      .catch((e) => {
        this.toastr.error('', e.error);
        this.cd.detectChanges();
      });
  }

  onSubmit() {
    let model = {
      organization: { ...this.objDetail.organization, ...this.organForm.value },
      represent: { ...this.objDetail.represent, ...this.representForm.value },
    };

    this.create(model);
  }

  create(model: any) {
    this.isSubmitted = true;
    this.setSubmitted.emit({
      data: true,
    });
    let textMess = (this.id ? 'Chỉnh sửa' : 'Thêm') + ' trường học';
    this.organizationService
      .post(this.ORGANIZATIONS + '/updateSchool', model)
      .then(() => {
        this.router.navigate(['/schools']);
        this.toastr.success('', textMess + ' thành công');
      })
      .catch((e) => {
        this.isSubmitted = false;
        this.setSubmitted.emit({
          data: false,
        });
        this.toastr.error('', e.error.Message || e.error);
        this.cd.detectChanges();
      });
  }

  handleFilterSchool(event: any) {
    let name = event.target.name;
    let value = event.target.value;
    if (name == 'provinceCode') {
      let provinceCode = value;
      this.districts = this.loadDistricts(provinceCode, true);
    }
  }
  getLastId() {
    this.organizationService
      .getLastId(this.ORGANIZATIONS)
      .then((res: any) => {
        const index = (100000000 + res + 1).toString();
        let code = 'KE' + index.slice(1);
        this.organForm.controls['code'].setValue(code);
        this.cd.detectChanges();
      })
      .catch((e) => { });
  }
}
