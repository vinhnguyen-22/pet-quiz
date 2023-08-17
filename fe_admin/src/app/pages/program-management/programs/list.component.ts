import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Component, ChangeDetectorRef, ViewChild } from '@angular/core';
import { ProgramService } from 'src/app/containers/services/program.service';
import { AuthService } from 'src/app/containers/services/auth/auth.service';
import { ROLE } from './../../../containers/constants/index';
import { ShareService } from 'src/app/containers/services/share/share.service';
import { CommonModalComponent } from 'src/app/modules/SharedModule/modal/modal.component';

@Component({
  selector: 'app-program-list',
  templateUrl: './list.component.html',
})
export class ProgramListComponent {

  @ViewChild('confirmationModal')
  private modalComponent!: CommonModalComponent;
  private API_ENDPOINT = 'programs';
  filter = {
    name: '',
  };

  canEditProgram = false;

  objectDataTable: any = {
    datas: [],
    headers: [
      {
        key: 'name',
        value: 'Tên chương trình',
      },
      {
        key: 'lessonPerWeek',
        value: 'Số tiết/tuần',
        position: 'center',
      },
      {
        key: 'lessonCount',
        value: 'Số bài học',
        position: 'center',
      },
      {
        key: 'createdDate',
        value: 'Ngày tạo',
        position: 'center',
      },
    ],
  };
  constructor(
    public programService: ProgramService,
    private auth: AuthService,
    private toastr: ToastrService,
    private cd: ChangeDetectorRef,
    public sharedService: ShareService
  ) {
    this.auth.currentUserSubject.asObservable().subscribe((res) => {
      this.canEditProgram = res?.roleId == ROLE.ADMIN || res?.roleId == ROLE.CONTENT_ADMIN || res?.roleId == ROLE.CMS_ADMIN;
    });
  }

  ngOnInit(): void {
    this.getPrograms();
  }

  getPrograms = () => {
    this.programService
      .getByModel(this.API_ENDPOINT, this.filter)
      .then((res: any) => {
        this.objectDataTable.datas = res;
        this.cd.detectChanges();
      })
      .catch((e: any) => { });
  };

  changeFilter = () => {
    this.getPrograms();
  };

  getProgramValue(program, columnName) {
    return program[columnName];
  }

  remove(programId) {
    let values = {
      programId,
    };
    this.openRemoveGameConfirmationModal(values, 'Xoá chương trình', 'Bạn có muốn xoá chương trình này không?');
  }

  async openRemoveGameConfirmationModal(values, title: string, text: string) {
    return await this.modalComponent.openDeleteConfirmationModal(values, title, text);
  }

  getConfirmationValue($event: any) {
    let returnData = $event;

    if (returnData.result == 'Confirm') {
      let programId = returnData.values.programId;
      this.programService
        .remove(programId)
        .then((res: any) => {
          if (res.length > 0) {
            this.toastr.error('', 'Chương trình này đang được sử dụng');
          } else {
            this.toastr.success('', 'Xóa chương trình thành công');
            for (let index = 0; index < this.objectDataTable.datas.length; index++) {
              let program = this.objectDataTable.datas[index];
              if (program.id == programId) {
                this.objectDataTable.datas.splice(index, 1);
                this.cd.detectChanges();
              }
            }
          }

        })
        .catch((e) => {
          this.toastr.error('', 'Xóa chương trình thất bại');
        });
    }
  }
}
