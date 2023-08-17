import { OrganizationService } from 'src/app/containers/services/organization.service';
import { UserService } from 'src/app/containers/services/user.service';
import { Component, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { ROLE } from 'src/app/containers/constants';
import { AuthService } from 'src/app/containers/services/auth/auth.service';
import { ProgramService } from 'src/app/containers/services/program.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-school-implement',
  templateUrl: './school-edit.component.html',
})
export class SchoolImplementComponent {
  private ORGAN = 'organizations';
  id: number;
  isSubmitted: boolean = false;
  organDetail: any = {};
  currentUser: any;
  configTeacher: any;
  configProgram: any;
  programs: any = [];
  objTeacher: any;
  objProgram: any;
  errorMessage = '';
  title = '';
  type: any;
  constructor(
    private teachersService: UserService,
    private OrganizationService: OrganizationService,
    private toastr: ToastrService,
    private router: Router,
    private auth: AuthService,
    public programService: ProgramService,
    private cd: ChangeDetectorRef,
    private route: ActivatedRoute
  ) {
    this.auth.currentUserSubject.asObservable().subscribe((res) => (this.currentUser = res));
    this.type = this.router.getCurrentNavigation()?.extras?.state?.type;
  }

  ngOnInit(): void {
    this.loadSchool();
  }
  ngAfterViewInit(): void {}
  filterTeacher = {
    status: 0,
    searchTerm: '',
    roleId: ROLE.TEACHER,
    organId: 0,
  };
  loadSchool() {
    const sb = this.route.paramMap
      .pipe(
        switchMap((params) => {
          this.id = Number(params.get('id'));
          if (this.id || this.id > 0) {
            return this.OrganizationService.getItemById(this.ORGAN, this.id);
          }
        }),
        catchError((errorMessage) => {
          this.errorMessage = errorMessage;
          return of(undefined);
        })
      )
      .subscribe((res: any) => {
        if (!res) {
          this.router.navigate(['/center-management/schools'], {
            relativeTo: this.route,
          });
        }
        this.organDetail = res;
        this.filterTeacher.organId = this.currentUser?.organization?.id;
        if (this.type == 'teacher') {
          this.title = 'Chọn giáo viên trường ';
          this.getUsers();
        } else {
          this.title = 'Chọn chương trình trường ';
          this.getPrograms();
        }
      });
  }
  getPrograms = () => {
    const params = {
      name: '',
      gradeId: 0,
      organId: this.currentUser.organization.id,
    };
    this.programService
      .getByModel('programs', params)
      .then((res: any) => {
        let data = [];
        if (this.organDetail?.organization?.listPrograms?.length > 0) {
          let listId = ',' + this.organDetail?.organization?.listPrograms.map((t: any) => t.id).join(',') + ',';
          data = res.map((r: any) => ({
            ...r,
            selected: listId.includes(',' + r.id + ','),
            isDisabled: listId.includes(',' + r.id + ','),
          }));
        } else {
          data = res;
        }
        this.configProgram = {
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
        };
        this.cd.detectChanges();
      })
      .catch((e: any) => {});
  };
  getUsers = () => {
    this.teachersService
      .getByModel('users', this.filterTeacher)
      .then((res: any) => {
        let data = [];
        if (this.organDetail?.organization?.listTeachers?.length > 0) {
          let listId = ',' + this.organDetail?.organization?.listTeachers.map((t: any) => t.id).join(',') + ',';
          data = res.map((r: any) => ({
            ...r,
            selected: listId.includes(',' + r.id + ','),
          }));
        } else {
          data = res;
        }
        this.configTeacher = {
          list: data || [],
          value: 'id',
          availableTitle: 'Danh sách giáo viên',
          selectedTitle: 'Danh sách giáo viên được chọn',
          addButtonText: 'Thêm',
          removeButtonText: 'Xoá',
          addAllButtonText: 'Thêm tất cả',
          removeAllButtonText: 'Xoá tất cả',
          searchPlaceholder: 'Tìm kiếm giáo viên',
          text: 'userName',
        };
        this.cd.detectChanges();
      })
      .catch((e) => {});
  };
  save() {
    let listTeacherId;
    let listProgramId;
    if (this.type == 'teacher') {
      listTeacherId = this.objTeacher.selected.map((e: any) => e.dataset.id).join(',');
    } else {
      listProgramId = this.objProgram.selected.map((e: any) => e.dataset.id).join(',');
    }
    let textMess = (this.id ? 'Chỉnh sửa' : 'Thêm') + ' dữ liệu trường học';
    this.isSubmitted = true;
    this.teachersService
      .post('organizations/assign', { listTeacherId, listProgramId, schoolId: this.id })
      .then(() => {
        this.router.navigate(['/center-management/schools'], {
          relativeTo: this.route,
        });
        this.toastr.success('', textMess + ' thành công');
      })
      .catch((e) => {
        this.isSubmitted = false;
        this.toastr.error('', textMess + ' thất bại');
        this.cd.detectChanges();
      });
  }
  setObj(event: any, type) {
    if (type == 'teacher') {
      this.objTeacher = event.data;
    } else {
      this.objProgram = event.data;
    }
  }
}
