import { AKITA_STORE } from './../../../../containers/constants/index';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { OptionQuery } from 'src/app/store/option/optionQuery';
import { ProgramService } from 'src/app/containers/services/program.service';
import { ToastrService } from 'ngx-toastr';
import { FormCanDeactivate } from 'src/app/containers/guards/can-deactivate/can-deactivate';

@Component({
  selector: 'app-program-edit',
  templateUrl: './program-edit.component.html',
  styleUrls: ['./program-edit.component.css'],
})
export class ProgramEditComponent extends FormCanDeactivate {
  isSubmitted: boolean;

  private API_ENDPOINT = 'programs';
  public Editor = ClassicEditor;
  lessonPerWeeks = [
    {
      key: 2,
      value: '2 Tiết',
    },
    {
      key: 3,
      value: '3 Tiết',
    },
    {
      key: 4,
      value: '4 Tiết',
    },
    {
      key: 5,
      value: '5 Tiết',
    },
  ];
  id: number;
  formGroup: FormGroup;
  descriptionForm: FormGroup;
  errorMessage = '';
  grades: any = [];
  activeTabId = 1;
  contentLessons = [
    {
      index: 1,
      title: 'Mục tiêu chương trình',
      key: 'target',
      value: '',
    },
    {
      index: 2,
      title: 'Kỹ năng ngôn ngữ (nghe)',
      key: 'listening',
      value: '',
    },
    {
      index: 3,
      title: 'Kỹ năng ngôn ngữ (nói)',
      key: 'speaking',
      value: '',
    },
    {
      index: 4,
      title: 'Kỹ năng ngôn ngữ (đọc)',
      key: 'reading',
      value: '',
    },
    {
      index: 5,
      title: 'Kỹ năng ngôn ngữ (viết)',
      key: 'writing',
      value: '',
    },
    {
      index: 6,
      title: 'Kiến thức ngôn ngữ',
      key: 'language',
      value: '',
    },
    {
      index: 7,
      title: 'Kỹ năng khác',
      key: 'other',
      value: '',
    },
  ];
  isLoading = false;
  EMPTY_PROGRAM: any = {
    id: 0,
    gradeId: '',
    lessonPerWeek: '',
    name: '',
    status: 1,
    description: {
      target: '',
      listening: '',
      speaking: '',
      reading: '',
      writing: '',
      language: '',
      other: '',
    },
  };
  program: any = {
    ...this.EMPTY_PROGRAM,
    description: {
      target: 'alo',
      listening: '',
      speaking: '',
      reading: '',
      writing: '',
      language: '',
      other: '',
    },
  };
  constructor(
    private fb: FormBuilder,
    private programService: ProgramService,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef,
    private optionQuery: OptionQuery
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
      this.grades = options[AKITA_STORE.GRADE];
      this.loadProgram();
    }
  };

  loadProgram() {
    this.route.paramMap
      .pipe(
        switchMap((params) => {
          this.id = Number(params.get('id'));
          if (this.id || this.id > 0) {
            return this.programService.getItemById(this.API_ENDPOINT, this.id);
          }
          return of(this.EMPTY_PROGRAM);
        }),
        catchError((errorMessage) => {
          this.errorMessage = errorMessage;
          return of(undefined);
        })
      )
      .subscribe((res: any) => {
        if (!res) {
          this.router.navigate(['/programs'], { relativeTo: this.route });
        }
        if (this.id) {
          res.description = res.description ? JSON.parse(res.description) : { ...this.EMPTY_PROGRAM.description };
        }
        this.program = res;
        this.loadForm();
      });
  }

  save() {
    let model = { ...this.program, ...this.formGroup.value };
    model.description = JSON.stringify(this.descriptionForm.value);
    this.create(model);
  }

  loadForm() {
    if (!this.program) {
      return;
    }
    this.formGroup = this.fb.group({
      gradeId: [this.program.gradeId, Validators.compose([Validators.required])],
      name: [this.program.name, Validators.compose([Validators.required])],
      lessonPerWeek: [this.program.lessonPerWeek, Validators.compose([Validators.required])],
    });
    this.descriptionForm = this.fb.group({
      target: [this.program.description.target],
      listening: [this.program.description.listening],
      speaking: [this.program.description.speaking],
      reading: [this.program.description.reading],
      writing: [this.program.description.writing],
      language: [this.program.description.language],
      other: [this.program.description.other],
    });
    this.cd.detectChanges();
  }
  isControlValid(controlName: string): boolean {
    const control = this.formGroup.controls[controlName];
    return control.valid && (control.dirty || control.touched);
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.formGroup.controls[controlName];
    return control.invalid && (control.dirty || control.touched);
  }

  controlHasError(validation: string, controlName: string) {
    const control = this.formGroup?.controls[controlName];
    return control.hasError(validation) && (control.dirty || control.touched);
  }
  create(model: any) {
    this.isSubmitted = true;
    let textMess = (this.id ? 'Chỉnh sửa' : 'Thêm') + ' chương trình';
    this.programService
      .update(model)
      .then(() => {
        this.router.navigate(['/programs']);
        this.toastr.success('', textMess + ' thành công');
      })
      .catch((e) => {
        this.isSubmitted = false;
        this.toastr.error('', e);
        this.cd.detectChanges();
      });
  }
  setActiveTab(tabId: number) {
    this.activeTabId = tabId;
  }

  getActiveTabCSSClass(tabId: number) {
    if (tabId !== this.activeTabId) {
      return '';
    }
    return 'active';
  }
}
