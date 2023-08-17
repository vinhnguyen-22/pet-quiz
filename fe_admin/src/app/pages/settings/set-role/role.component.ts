import { ChangeDetectorRef, Component } from '@angular/core';
import { OptionQuery } from 'src/app/store/option/optionQuery';
import { RoleService } from 'src/app/containers/services/role.service';
import { ToastrService } from 'ngx-toastr';
import { AKITA_STORE } from 'src/app/containers/constants';
import { FormCanDeactivate } from 'src/app/containers/guards/can-deactivate/can-deactivate';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
})
export class RoleComponent extends FormCanDeactivate {
  isSubmitted: boolean;
  roles: any = [];
  roleId: number = 1;
  pems: any = {};
  userPermissions: any = [];
  permissions: any = [];
  currentUser: any = {};
  constructor(private optionQuery: OptionQuery, private roleService: RoleService, private toastr: ToastrService, private cd: ChangeDetectorRef) {
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
      this.roles = options[AKITA_STORE.ROLE];
      this.roleId = this.roles[0].id;
      this.getUserPermission(this.roleId, true);
      this.cd.detectChanges();
    }
  };
  getUserPermission = (roleId, isFirst) => {
    this.roleService
      .getUserPermission(roleId)
      .then((res: any) => {
        this.userPermissions = res;
        if (isFirst) {
          this.getPermission();
        } else {
          this.setConfigDual();
        }
        this.cd.detectChanges();
      })
      .catch(() => {});
  };
  getPermission = () => {
    this.roleService
      .getPermission()
      .then((res: any) => {
        this.permissions = res;
        this.setConfigDual();
        this.cd.detectChanges();
      })
      .catch(() => {});
  };

  changeFilter() {
    this.getUserPermission(this.roleId, false);
  }

  setConfigDual() {
    let data = [];
    let listId = ',' + this.userPermissions?.map((t: any) => t.id).join(',') + ',';
    data = this.permissions.map((r: any) => ({
      ...r,
      selected: listId.includes(',' + r.id + ','),
    }));
    const element = document.querySelector('.dual-listbox.kt_dual_listbox_3');
    if (element) {
      element.remove();
    }
    this.pems = {
      list: data,
      value: 'id',
      availableTitle: 'Danh sách chức năng',
      selectedTitle: 'Danh sách chức năng đã thêm',
      addButtonText: 'Thêm',
      removeButtonText: 'Xoá',
      addAllButtonText: 'Thêm tất cả',
      removeAllButtonText: 'Xoá tất cả',
      searchPlaceholder: 'Tìm kiếm chức năng',
      text: 'title',
      showAddButton: true,
      showRemoveButton: true,
      showAddAllButton: true,
      showRemoveAllButton: true,
    };
  }

  setPermission = (event: any) => {
    this.pems = event.data;
  };

  save = () => {
    let ids = this.pems.selected.map((e: any) => {
      return parseInt(e.dataset.id);
    });
    let model = {
      roleId: this.roleId,
      permissions: ids,
    };
    this.roleService
      .setPermission(model)
      .then((res: any) => {
        this.toastr.success('', 'Phân quyền thành công');
      })
      .catch(() => {});
  };
}
