import { AKITA_STORE, GENERAL_ERROR_MESSAGE, HTTP_RESPONSE_TYPE, REGEX_NUMBER_LARGER_THAN_0 } from '../../../../containers/constants/index';
import { Component, ViewChild, ChangeDetectorRef, ElementRef, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { OrganizationService } from 'src/app/containers/services/organization.service';
import KTWizard from '../../../../../assets/js/components/wizard.js';
import { KTUtil } from '../../../../../assets/js/components/util';
import { OptionQuery } from 'src/app/store/option/optionQuery';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { STATUSES, REGEX_PN } from 'src/app/containers/constants';
import { ProgramService } from 'src/app/containers/services/program.service';
import { ToastrService } from 'ngx-toastr';
import { DistrictService } from 'src/app/containers/services/district.service';
import { AuthService } from 'src/app/containers/services/auth/auth.service';

@Component({
  selector: 'app-center-edit',
  templateUrl: './center-edit.component.html',
})
export class CenterEditComponent {
  @Output('setSubmitted') setSubmitted: any = new EventEmitter<any>();
  isSubmitted: boolean;
  private ORGANIZATIONS = 'organizations';
  @ViewChild('wizard', { static: true }) el: ElementRef;
  configDua: any = {};
  objDua: any;
  EMPTY_ORGANIZATION = {
    organization: {
      id: 0,
      name: '',
      phoneNumber: '',
      address: '',
      status: 1,
      provinceCode: 0,
      description: '',
      listSchoolId: '',
      type: 1,
      listSchools: [],
      centerTypeId: 0,
      packageId: 0,
    },
    represent: {
      id: 0,
      name: '',
      position: '',
      phoneNumber: '',
      email: '',
    },
  };
  packages: any = [];
  status: any = STATUSES;
  dropdownSettings: IDropdownSettings = {};
  dropdownSettingsPro: IDropdownSettings = {};
  organForm: FormGroup;
  representForm: FormGroup;
  id: number;
  errorMessage = '';
  provinces: any = [];
  options: any = [];
  districts: any = [];
  accountTypes: any = [];
  filterSchool: any = {
    type: 2,
  };
  objDetail: any = this.EMPTY_ORGANIZATION;
  wizard: any;
  schoolsList = [];

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
  ) {}

  ngOnInit(): void {
    this.dropdownSettings = {
      idField: 'id',
      textField: 'name',
      selectAllText: 'Chọn tất cả',
      unSelectAllText: 'Bỏ chọn',
      allowSearchFilter: true,
      searchPlaceholderText: 'Tìm trường',
      noDataAvailablePlaceholderText: 'Không có dữ liệu trường học',
    };

    this.ENABLE_EDITING = this.authService.isAdmin();
    this.loadOption();
  }

  ngAfterViewInit(): void {
    this.wizard = new KTWizard(this.el.nativeElement, {
      startStep: 1,
    });

    this.wizard.on('beforeNext', (wizardObj) => {});

    this.wizard.on('change', () => {
      setTimeout(() => {
        KTUtil.scrollTop();
      }, 500);
    });
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
          this.errorMessage = errorMessage;
          return of(undefined);
        })
      )
      .subscribe((res: any) => {
        if (!res) {
          this.router.navigate(['/centers'], { relativeTo: this.route });
        }
        this.objDetail = res;
        if (!this.id) {
          if (this.provinces.length > 0) {
            this.objDetail.organization.provinceCode = this.provinces[0].code;
          }
          if (this.accountTypes.length > 0) {
            this.objDetail.organization.centerTypeId = this.accountTypes[0].id;
          }
          if (this.packages.length > 0) {
            this.objDetail.organization.packageId = this.packages[0].id;
          }
        }
        this.loadForm();
        this.getPrograms();
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
      phoneNumber: [
        {
          value: this.objDetail.organization.phoneNumber,
          disabled: !this.ENABLE_EDITING,
        },
        Validators.compose([Validators.required, Validators.pattern(REGEX_PN)]),
      ],
      provinceCode: [
        {
          value: this.objDetail.organization.provinceCode,
          disabled: !this.ENABLE_EDITING,
        },
        Validators.compose([Validators.required]),
      ],
      type: [
        {
          value: this.objDetail.organization.type,
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
      status: [
        {
          value: this.objDetail.organization.status,
          disabled: !this.ENABLE_EDITING,
        },
      ],
      address: [
        {
          value: this.objDetail.organization.address,
          disabled: !this.ENABLE_EDITING,
        },
      ],
      listSchools: [
        {
          value: this.objDetail.organization.listSchools,
          disabled: !this.ENABLE_EDITING,
        },
      ],
      id: [
        {
          value: this.objDetail.organization.id,
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
          disabled: this.id,
        },
        Validators.compose([Validators.required, Validators.email]),
      ],
      phoneNumber: [
        {
          value: this.objDetail.represent.phoneNumber,
          disabled: !this.ENABLE_EDITING,
        },
        Validators.compose([Validators.required]),
      ],
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

  getSchool = () => {
    this.filterSchool.centerId = this.id;
    this.organizationService
      .getAllOrganizations(this.filterSchool)
      .then((res: any) => {
        this.schoolsList = res;
        this.cd.detectChanges();
      })
      .catch((e) => {});
  };

  getPrograms = () => {
    const params = {
      name: '',
      gradeId: 0,
      organId: 1,
    };
    this.programService
      .getAllWithoutDetails(params)
      .then((res: any) => {
        let data = [];
        if (this.objDetail.organization?.listPrograms?.length > 0) {
          let listId = ',' + this.objDetail.organization.listPrograms.map((t: any) => t.id).join(',') + ',';
          data = res.map((r: any) => ({
            ...r,
            selected: listId.includes(',' + r.id + ','),
            isDisabled: listId.includes(',' + r.id + ','),
          }));
        } else {
          data = res;
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
          showAddButton: false,
          showRemoveButton: false,
          showAddAllButton: false,
          showRemoveAllButton: false,
        };
        this.cd.detectChanges();
      })
      .catch((e: any) => {});
  };
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
      this.accountTypes = options[AKITA_STORE.ACCOUNT_TYPE];
      this.packages = options[AKITA_STORE.PACKAGE];
      var provinceCode = this.provinces[0].code;
      this.filterSchool.provinceCode = provinceCode;

      this.loadDistricts(provinceCode);
      this.loadOrganization();
    }
  };

  loadDistricts(provinceCode) {
    this.districtService
      .getByProvinceCode(provinceCode)
      .then((res: any) => {
        if (!res) {
          this.toastr.error('', GENERAL_ERROR_MESSAGE);
          this.cd.detectChanges();
        }
        if (res.status == HTTP_RESPONSE_TYPE.SUCCESS) {
          this.districts = res.returnData;
          this.filterSchool.districtCode = this.districts[0].code;
          this.getSchool();
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

  onSubmit() {
    if (!this.ENABLE_EDITING) {
      return;
    }
    let model = {
      organization: { ...this.objDetail.organization, ...this.organForm.value },
      represent: { ...this.objDetail.represent, ...this.representForm.value },
    };

    model.organization.listPrograms = this.objDua.selected.map((e: any) => {
      return { id: parseInt(e.dataset.id) };
    });
    this.create(model);
  }

  create(model: any) {
    this.isSubmitted = true;
    this.setSubmitted;
    this.setSubmitted.emit({
      data: true,
    });
    let textMess = (this.id ? 'Chỉnh sửa' : 'Thêm') + ' trung tâm';
    this.organizationService
      .create(model)
      .then(() => {
        this.router.navigateByUrl('/centers', {
          state: { provinceCode: model.organization.provinceCode },
        });
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
      this.districts = this.loadDistricts(provinceCode);
      this.filterSchool.provinceCode = value;
    } else {
      this.filterSchool.districtCode = value;
      this.getSchool();
    }
  }

  setObj(event: any) {
    this.objDua = event.data;
  }
}
