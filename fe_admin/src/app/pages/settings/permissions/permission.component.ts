import { ChangeDetectorRef, Component } from '@angular/core';
import { OptionQuery } from 'src/app/store/option/optionQuery';
import { RoleService } from 'src/app/containers/services/role.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/containers/services/auth/auth.service';
import { AKITA_STORE } from 'src/app/containers/constants';

@Component({
  selector: 'app-permission',
  templateUrl: './permission.component.html',
})
export class PermissionComponent {
  isSubmitted: boolean;
  currentUser: any = {};
  roles = [];
  constructor(
    private optionQuery: OptionQuery,
    private roleService: RoleService,
    private toastr: ToastrService,
    private auth: AuthService,
    private cd: ChangeDetectorRef
  ) {
    this.auth.currentUserSubject.asObservable().subscribe((res) => (this.currentUser = res));
  }

  ngOnInit(): void {
    this.getPermission();
  }

  getPermission = () => {
    this.roleService
      .getPermission()
      .then((res: any) => {
        this.roles = res;
        this.cd.detectChanges();
      })
      .catch(() => {});
  };
  onBlurMethod(file) {
    this.roleService
      .updateEndpoint(file)
      .then((res: any) => {
        file.isUpdate = false;
        this.cd.detectChanges();
        this.toastr.success('', 'Chỉnh sửa thành công');
      })
      .catch((err) => {
        this.toastr.error('', err.message);
      });
  }
  onUpdate(form, file) {
    file.isUpdate = true;
    this.cd.detectChanges();
    var className = '.' + form;
    var item: any = document.querySelector(className);
    item.focus();
  }
}
