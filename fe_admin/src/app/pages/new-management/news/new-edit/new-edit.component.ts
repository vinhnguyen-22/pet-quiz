import { AKITA_STORE } from './../../../../containers/constants/index';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of, Subscription } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { NewService } from 'src/app/containers/services/new.service';
import { OptionQuery } from 'src/app/store/option/optionQuery';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ToastrService } from 'ngx-toastr';
import { FormCanDeactivate } from 'src/app/containers/guards/can-deactivate/can-deactivate';

@Component({
  selector: 'app-new-edit',
  templateUrl: './new-edit.component.html',
})
export class NewEditComponent extends FormCanDeactivate implements OnInit {
  isSubmitted: boolean;

  id: number;
  _new: any;
  categories: any = [];
  public Editor = ClassicEditor;
  EMPTY_NEW: any = {
    id: 0,
    title: '',
    image: '',
    category: 'Tin tức chung',
    content: '',
  };
  isLoading$: Observable<boolean>;
  private subscriptions: Subscription[] = [];
  constructor(
    private newService: NewService,
    private router: Router,
    private cd: ChangeDetectorRef,
    private toastr: ToastrService,
    private optionQuery: OptionQuery,
    private route: ActivatedRoute
  ) {
    super();
  }

  ngOnInit(): void {
    this.loadNew();
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
      this.categories = options[AKITA_STORE.NEW_TYPE];
      this.cd.detectChanges();
    }
  };
  loadNew() {
    const sb = this.route.paramMap
      .pipe(
        switchMap((params) => {
          this.id = Number(params.get('id'));
          if (this.id || this.id > 0) {
            return this.newService.getItemById(this.id);
          }
          return of(this.EMPTY_NEW);
        }),
        catchError((errorMessage) => {
          return of(undefined);
        })
      )
      .subscribe((res: any) => {
        if (!res) {
          this.router.navigate(['/new-management'], { relativeTo: this.route });
        }
        this._new = res;
        this.cd.detectChanges();
      });
    this.subscriptions.push(sb);
  }
  setSrc($event: any) {
    this._new.image = $event;
  }
  save() {
    this.isSubmitted = true;
    let textMess = (this.id ? 'Chỉnh sửa' : 'Thêm') + ' tin tức';

    this.newService
      .update(this._new)
      .then((res: any) => {
        this.router.navigate(['/new-management']);
        this.toastr.success('', textMess + ' thành công');
      })
      .catch((e) => {
        this.isSubmitted = false;
        this.toastr.error('', textMess + ' thất bại');
        this.cd.detectChanges();
      });
  }
}
