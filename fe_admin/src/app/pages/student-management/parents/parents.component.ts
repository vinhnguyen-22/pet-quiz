import { UserService } from 'src/app/containers/services/user.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ParentService } from 'src/app/containers/services/parent.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-parents',
  templateUrl: './parents.component.html',
})
export class ParentsComponent implements OnInit {
  parents: any = [];
  filter: any = {
    searchTerm: ""
  }
  constructor(
    private parentService: ParentService,
    private cd: ChangeDetectorRef,
    private toastr: ToastrService,
    private userService: UserService,
  ) {

  }

  ngOnInit(): void {
    this.getAll();
  }

  getAll = () => {
    this.parentService
      .getAll(this.filter)
      .then((res: any) => {
        this.parents = res;
        this.cd.detectChanges();
      })
      .catch((e) => { });
  };

  resetPassword(id) {
    this.userService.resetPassword(id)
      .then((res: any) => {
        if (res) {
          this.toastr.success('', 'Thay đổi về mật khẩu mặc dịnh');
        }
      })
      .catch((e) => {
        this.toastr.error('', 'Thất bại');
      });
  }

  changeFilter = () => {
    this.getAll();
  };
}
