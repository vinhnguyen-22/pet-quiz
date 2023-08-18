import { ROLE } from "src/constants/index";

import { Injectable } from "@angular/core";
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";
import { AuthService } from "src/services/auth/auth.service";

@Injectable({ providedIn: "root" })
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  adminCanActivate(page) {
    const pageListActive = [
      "/programs",
      "/contacts",
      "/programs/add",
      "/lessons",
      "/lessons/add",
      "/topics",
      "/topics/add",
      "/topics/evaluationForm/add",
      "/topics/evaluationForm/edit",
      "/structures",
      "/structures/add",
      "/document-library",
      "/document-library/lesson/add",
      "/document-library/game/add",
      "/document-library/lesson",
      "/document-library/game",
      "/games",
      "/games/add",
      "/schools",
      "/centers",
      "/centers/add",
      "/users",
      "/users/add",
      "/notifications",
      "/notifications/add",
      "/new-management",
      "/new-management/add",
      "/feedbacks",
      "/request-support-list",
      "/customers",
      "/statistical",
      "/students",
      "/roles",
      "/permissions",
    ];
    let isActivate = pageListActive.includes(page);
    let arr = page.split("/");
    if (arr[1] == "document-library") {
      if (!isActivate) this.router.navigate(["/" + arr[1] + "/" + arr[2]]);
    } else {
      if (!isActivate) this.router.navigate(["/" + arr[1]]);
    }
    return isActivate;
  }

  centerCanActivate(page) {
    const pages = [
      "/center-management/classes",
      "/center-management/classes/add",
      "/student-management/students",
      "/student-management/student-store",
      "/center-management/classes/student-edit",
      "/center-management/classes/student-detail",
      "/center-management/schools",
      "/center-management/teachers",
      "/center-management/teachers/add",
      "/teaching-plan",
      "/notifications",
      "/new-management",
      "/feedbacks",
      "/request-support-list",
      "/programs",
      "/news",
      "/send-feedback",
      "/statistical",
      "/request-support",
      "/student-management/parents",
    ];
    let isActivate = pages.includes(page);
    let arr = page.split("/");
    if (arr[1] == "center-management" || arr[1] == "student-management") {
      if (!isActivate) this.router.navigate(["/" + arr[1] + "/" + arr[2]]);
    } else {
      if (!isActivate) this.router.navigate(["/" + arr[1]]);
    }
    return isActivate;
  }
  contentAdminCanActivate(page) {
    const pages = [
      "/programs",
      "/lessons",
      "/topics",
      "/structures",
      "/documents",
      "/games",
      "/games/add",
      "/document-library",
      "/document-library/lesson/add",
      "/document-library/game/add",
      "/document-library/lesson",
      "/document-library/game",
    ];
    let isActivate = pages.includes(page);
    let arr = page.split("/");
    if (arr[1] == "document-library") {
      if (!isActivate) this.router.navigate(["/" + arr[1] + "/" + arr[2]]);
    } else {
      if (!isActivate) this.router.navigate(["/" + arr[1]]);
    }
    return isActivate;
  }

  schoolAdminCanActivate(page) {
    const pages = [
      "/statistical",
      "/center-management/classes",
      "/center-management/classes/add",
      "/student-management/students",
      "/center-management/classes/student-edit",
      "/center-management/classes/student-detail",
      "/center-management/teachers",
      "/center-management/teachers/add",
      "/teaching-plan",
      "/programs",
      "/new-management",
      "/new-management/add",
      "/feedback",
      "/send-feedback",
      "/request-support",
      "/news",
      "/notifications",
      "/notifications/add",
    ];
    let isActivate = pages.includes(page);
    let arr = page.split("/");
    if (arr[1] == "center-management") {
      if (!isActivate) this.router.navigate(["/" + arr[1] + "/" + arr[2]]);
    } else {
      if (!isActivate) this.router.navigate(["/" + arr[1]]);
    }
    return isActivate;
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authService.currentUserValue;
    switch (currentUser?.roleId) {
      case ROLE.ADMIN:
        return this.adminCanActivate(state.url);
      case ROLE.STAFF:
        return this.adminCanActivate(state.url);
    }
    this.router.navigate(["/error"]);
    return false;
  }
}
