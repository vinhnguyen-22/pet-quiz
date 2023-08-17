import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/containers/services/auth/auth.service';
import { CustomModalService } from 'src/app/containers/services/modal.service';
import { LayoutService } from '../../../../../core';

@Component({
  selector: 'app-user-offcanvas',
  templateUrl: './user-offcanvas.component.html',
  styleUrls: ['./user-offcanvas.component.scss'],
})
export class UserOffcanvasComponent implements OnInit {
  extrasUserOffcanvasDirection = 'offcanvas-right';
  currentUser: any;

  constructor(
    private layout: LayoutService,
    private auth: AuthService,
    private modal: CustomModalService
  ) {
    this.currentUser = this.auth.currentUserValue;
  }

  ngOnInit(): void {
    this.extrasUserOffcanvasDirection = `offcanvas-${this.layout.getProp('extras.user.offcanvas.direction')}`;
  }

  openModalChangePassword() {
    this.modal.Dialog('changePassword', true, {});
  }

  logout = () => {
    let param = {
      userId: this.currentUser.id,
      domain: 'CMS',
    };
    this.auth.logout(param);
  };
}
