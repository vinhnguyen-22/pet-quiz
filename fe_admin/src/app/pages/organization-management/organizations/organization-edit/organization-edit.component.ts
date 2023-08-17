import { FormCanDeactivate } from 'src/app/containers/guards/can-deactivate/can-deactivate';
import { Component } from '@angular/core';
import { AuthService } from 'src/app/containers/services/auth/auth.service';
import { ROLE } from 'src/app/containers/constants';

@Component({
  selector: 'app-organization-edit',
  templateUrl: './organization-edit.component.html',
})
export class OrganizationEditComponent extends FormCanDeactivate {
  isSubmitted: boolean;
  isSchool: boolean;
  constructor(private authService: AuthService) {
    super();
    let url = window.location.href.split('/');
    this.isSchool = url[3] == 'schools';
    var currentUser = this.authService.currentUserValue;
    if (currentUser?.roleId != ROLE.ADMIN) {
      // so the alert about destroying data will be bypass
      this.isSubmitted = true;
    }
  }

  setSubmitted(event: any) {
    this.isSubmitted = event.data;
  }
}
