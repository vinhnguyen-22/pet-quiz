import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ROLE } from 'src/app/containers/constants';
import { AuthService } from 'src/app/containers/services/auth/auth.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    var currentUser = this.authService.currentUserValue;
    var currentRoleId = currentUser?.roleId;
    var navigatePath = '/error';

    switch (currentRoleId) {
      case ROLE.ADMIN:
      case ROLE.CMS_ADMIN:
      case ROLE.ADMIN_SCHOOL:
      case ROLE.CENTER:
        navigatePath = '/statistical';
        break;

      case ROLE.CONTENT_ADMIN:
        navigatePath = '/programs';
        break;

      case ROLE.CUSTOMER_CARE:
        navigatePath = '/schools';

      default:
        break;
    }

    this.router.navigate([navigatePath]);
  }
}
