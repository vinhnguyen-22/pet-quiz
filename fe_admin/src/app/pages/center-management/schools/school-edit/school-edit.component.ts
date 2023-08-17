import { AKITA_STORE, GENERAL_ERROR_MESSAGE, HTTP_RESPONSE_TYPE } from '../../../../containers/constants/index';
import { Component, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
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
  isSubmitted: boolean;
  @ViewChild('wizard', { static: true }) el: ElementRef;
  private ORGANIZATIONS = 'organizations';
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
  ENABLE_EDITING = false;
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

  constructor(
    private organizationService: OrganizationService,
    private router: Router,
    private cd: ChangeDetectorRef,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private optionQuery: OptionQuery,
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
          this.router.navigate(['/center-management/schools'], {
            relativeTo: this.route,
          });
        }
        this.objDetail = res;
        if (this.id == 0) {
          if (this.provinces.length > 0 && this.objDetail.organization.provinceCode == 0) {
            this.objDetail.organization.provinceCode = this.provinces[0].code;
          }

          this.objDetail.organization.centerId = this.currentUser.organization.id;
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
      name: [this.objDetail.organization.name, Validators.compose([Validators.required])],
      implementType: [this.objDetail.organization.implementType],
      phoneNumber: [this.objDetail.organization.phoneNumber, Validators.compose([Validators.pattern(REGEX_PN)])],
      email: [this.objDetail.organization.email, Validators.compose([Validators.email])],
      provinceCode: [this.objDetail.organization.provinceCode, Validators.compose([Validators.required])],
      districtCode: [this.objDetail.organization.districtCode, Validators.compose([Validators.required])],
      description: [this.objDetail.organization.description],
      code: [this.objDetail.organization.code, Validators.compose([Validators.required])],
      address: [this.objDetail.organization.address],
      id: [this.objDetail.organization.id],
      type: [this.objDetail.organization.type],
      status: [this.objDetail.organization.status],
      centerId: [this.objDetail.organization.centerId],
    });
    this.representForm = this.fb.group({
      name: [this.objDetail.represent.name, Validators.compose([Validators.required])],
      position: [this.objDetail.represent.position],
      email: [this.objDetail.represent.email, Validators.compose([Validators.required, Validators.email])],
      phoneNumber: [this.objDetail.represent.phoneNumber, Validators.compose([Validators.pattern(REGEX_PN)])],
      id: [this.objDetail.represent.id],
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
    let textMess = (this.id ? 'Chỉnh sửa' : 'Thêm') + ' trường học';
    this.organizationService
      .post(this.ORGANIZATIONS + '/updateSchool', model)
      .then(() => {
        this.router.navigate(['/center-management/schools'], {
          relativeTo: this.route,
        });
        this.toastr.success('', textMess + ' thành công');
      })
      .catch((e) => {
        this.isSubmitted = false;
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
