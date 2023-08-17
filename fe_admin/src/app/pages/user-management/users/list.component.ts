import { AKITA_STORE } from './../../../containers/constants/index';
import { ChangeDetectorRef, Component } from '@angular/core';
import { AuthService } from 'src/app/containers/services/auth/auth.service';
import { OptionQuery } from 'src/app/store/option/optionQuery';
import { UserService } from 'src/app/containers/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './list.component.html',
})
export class UserListComponent {
  API_ENDPOINT = 'users/getAll';
  isLoading: boolean;
  currentUser: any;
  objectDataTable: any = {
    datas: [],
    actions: [
      {
        key: 'detail',
        value: 'Xem chi tiết',
      },
    ],
    headers: [
      {
        key: 'userName',
        value: 'Họ tên',
        width: '15%',
      },
      {
        key: 'roleName',
        type: 'role',
        value: 'Vai trò',
        width: '12%',
      },
      {
        key: 'genderName',
        value: 'Giới tính',
        type: 'gender',
        width: '14%',
      },
      {
        key: 'phoneNumber',
        value: 'Điện thoại',
        width: '14%',
      },
      {
        key: 'email',
        value: 'Email',
        width: '14%',
      }
    ],
  };
  filter: any = {
    organId: 0,
    roleId: 0,
    searchTerm: '',
    status: 0,
  };
  roles: any = [];
  constructor(public userService: UserService, public optionQuery: OptionQuery, private auth: AuthService, private cd: ChangeDetectorRef) {
    this.auth.currentUserSubject.asObservable().subscribe((res) => (this.currentUser = res));
    this.filter.organId = this.currentUser.organization.id;
  }

  ngOnInit(): void {
    this.getUsers();
    this.loadOption();
  }
  loadOption() {
    let options$ = this.optionQuery.selectAll();
    options$.subscribe((options: any) => {
      this.setInitialValues(options);
    });
  }

  setInitialValues = (options: any) => {
    if (options.length > 0) {
      let roles = options[AKITA_STORE.ROLE];
      this.roles = roles.filter((x: any) => x.id < 50);

      this.cd.detectChanges();
    }
  };

  getUsers = () => {
    this.userService
      .post('users/getAll', this.filter)
      .then((res: any) => {
        this.objectDataTable.datas = res;
        this.cd.detectChanges();
      })
      .catch((e) => { });
  };

  filterChanged() {
    this.getUsers();
  }
}
