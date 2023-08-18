import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { LayoutService } from "../../../../../_theme/core";
import { AuthService } from "src/services/auth/auth.service";

function getCurrentURL(location) {
  return location.split(/[?#]/)[0];
}

@Component({
  selector: "app-header-menu",
  templateUrl: "./header-menu.component.html",
})
export class HeaderMenuComponent implements OnInit {
  ulCSSClasses: string;
  currentUser: any;
  organName: string;
  rootArrowEnabled: boolean;
  location: Location;
  headerMenuDesktopToggle: string;

  constructor(
    private layout: LayoutService,
    private loc: Location,
    private auth: AuthService
  ) {
    this.location = this.loc;
    this.auth.currentUserSubject.asObservable().subscribe((res) => {
      this.currentUser = res;
      this.organName = this.currentUser?.organization?.name
        ? " - " + this.currentUser?.organization?.name
        : "";
    });
  }

  ngOnInit(): void {
    this.ulCSSClasses = this.layout.getStringCSSClasses("header_menu_nav");
    this.rootArrowEnabled = this.layout.getProp("header.menu.self.rootArrow");
    this.headerMenuDesktopToggle = this.layout.getProp(
      "header.menu.desktop.toggle"
    );
  }

  getMenuItemActive(url) {
    return this.checkIsActive(url) ? "menu-item-active" : "";
  }

  checkIsActive(url) {
    const location = this.location.path();
    const current = getCurrentURL(location);
    if (!current || !url) {
      return false;
    }

    if (current === url) {
      return true;
    }

    if (current.indexOf(url) > -1) {
      return true;
    }

    return false;
  }
}
