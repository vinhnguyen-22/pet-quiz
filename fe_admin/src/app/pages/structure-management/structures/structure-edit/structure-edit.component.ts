import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of, Subscription } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { StructureService } from 'src/app/containers/services/structure.service';
import { ToastrService } from 'ngx-toastr';
import { FormCanDeactivate } from 'src/app/containers/guards/can-deactivate/can-deactivate';

@Component({
  selector: 'app-structure-edit',
  templateUrl: './structure-edit.component.html',
})
export class StructureEditComponent extends FormCanDeactivate implements OnInit, OnDestroy {
  isSubmitted: boolean;

  private API_ENDPOINT = 'structures';
  EMPTY_STRUCTURE: any = {
    id: 0,
    name: '',
    status: 1,
    sections: [
      {
        id: 0,
        name: '',
      },
    ],
  };
  id: number;
  structure: any = { name: '' };
  formGroup: FormGroup;
  isLoading$: Observable<boolean>;
  errorMessage = '';
  private subscriptions: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    private structureService: StructureService,
    private router: Router,
    private cd: ChangeDetectorRef,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) {
    super();
  }

  ngOnInit(): void {
    this.loadStructure();
  }

  loadStructure() {
    const sb = this.route.paramMap
      .pipe(
        switchMap((params) => {
          this.id = Number(params.get('id'));
          if (this.id || this.id > 0) {
            return this.structureService.getItemById(this.API_ENDPOINT, this.id);
          }
          return of(this.EMPTY_STRUCTURE);
        }),
        catchError((errorMessage) => {
          this.errorMessage = errorMessage;
          return of(undefined);
        })
      )
      .subscribe((res: any) => {
        if (!res) {
          this.router.navigate(['/structures'], { relativeTo: this.route });
        }

        this.structure = res;
        this.cd.detectChanges();
      });
    this.subscriptions.push(sb);
  }

  addSection() {
    this.structure.sections.push({
      id: 0,
      name: '',
    });
  }
  changeSectionValue(index, event) {
    let value = event.target.value;
    this.structure.sections[index].name = value;
  }
  save() {
    this.isSubmitted = true;
    let textMess = (this.id ? 'Chỉnh sửa' : 'Thêm') + ' cấu trúc';
    let model = { ...this.structure };
    model.sections = this.structure.sections.filter((x) => x.id > 0 || x.name != '');
    this.structureService
      .post('structures/update', model)
      .then(() => {
        this.router.navigate(['/structures']);
        this.toastr.success('', textMess + ' thành công');
      })
      .catch((e) => {
        this.isSubmitted = false;
        this.toastr.error('', textMess + ' thất bại');
      });
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sb) => sb.unsubscribe());
  }
}
