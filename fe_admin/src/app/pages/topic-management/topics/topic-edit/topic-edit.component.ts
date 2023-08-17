import { Component, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { TopicService } from 'src/app/containers/services/topic.service';
import { OptionQuery } from 'src/app/store/option/optionQuery';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AKITA_STORE } from 'src/app/containers/constants';
import { ToastrService } from 'ngx-toastr';
import { FormCanDeactivate } from 'src/app/containers/guards/can-deactivate/can-deactivate';

@Component({
  selector: 'app-topic-edit',
  templateUrl: './topic-edit.component.html',
})
export class TopicEditComponent extends FormCanDeactivate {
  isSubmitted: boolean;

  EMPTY_TOPIC: any = {
    id: 0,
    name: '',
    gradeId: 0,
    image: '',
  };
  private API_DOMAIN = 'topics';
  id: number;
  topic: any = {};
  grades: any = [];
  errorMessage: '';
  formGroup: FormGroup;

  constructor(
    private topicService: TopicService,
    private cd: ChangeDetectorRef,
    private router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private route: ActivatedRoute,
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

      this.loadTopic();
    }
  };

  loadTopic() {
    this.route.paramMap
      .pipe(
        switchMap((params) => {
          this.id = Number(params.get('id'));
          if (this.id || this.id > 0) {
            return this.topicService.getItemById(this.API_DOMAIN, this.id);
          }
          return of(this.EMPTY_TOPIC);
        }),
        catchError((errorMessage) => {
          this.errorMessage = errorMessage;
          return of(undefined);
        })
      )
      .subscribe((res: any) => {
        if (!res) {
          this.router.navigate(['/topics'], { relativeTo: this.route });
        }
        this.topic = { ...res };
        if (!this.id) {
          this.topic.gradeId = this.grades[0].id;
        }
        this.loadForm();
      });
  }
  loadForm() {
    if (!this.topic) {
      return;
    }
    this.formGroup = this.fb.group({
      gradeId: [this.topic.gradeId, Validators.compose([Validators.required])],
      name: [this.topic.name, Validators.compose([Validators.required])],
      orderId: [this.topic.orderId, Validators.compose([Validators.required])],
      image: [this.topic.image],
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
  save() {
    this.isSubmitted = true;
    let textMess = (this.id ? 'Chỉnh sửa' : 'Thêm') + ' chủ đề';
    this.topicService
      .update({ ...this.topic, ...this.formGroup.value })
      .then(() => {
        this.router.navigate(['/topics']);
        this.toastr.success('', textMess + ' thành công');
      })
      .catch((e) => {
        this.isSubmitted = false;
        this.toastr.error('', textMess + ' thất bại');
        this.cd.detectChanges();
      });
  }
  setSrc($event: any) {
    this.formGroup.controls['image'].setValue($event);
    this.topic.image = $event;
  }
}
