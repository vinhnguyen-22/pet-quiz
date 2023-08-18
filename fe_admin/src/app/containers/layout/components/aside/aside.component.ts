import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ROLE } from 'src/app/constants';
import { AuthService } from 'src/app/services/auth/auth.service';
import { LayoutService } from '../../../../_theme/core';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss'],
})
export class AsideComponent implements OnInit {
  navItems: any = [];
  disableAsideSelfDisplay: boolean;
  headerLogo: string;
  brandSkin: string;
  ulCSSClasses: string;
  location: Location;
  asideMenuHTMLAttributes: any = {};
  asideMenuCSSClasses: string;
  asideMenuDropdown;
  brandClasses: string;
  asideMenuScroll = 1;
  asideSelfMinimizeToggle = false;
  currentUser: any;
  ROLE = ROLE;
  ROLE_ADMIN = ROLE.ADMIN;

  constructor(private layout: LayoutService, private loc: Location, public auth: AuthService) {
    this.auth.currentUserSubject.asObservable().subscribe((res) => (this.currentUser = res));

    this.currentUser?.roleId == this.ROLE_ADMIN;
  }

  ngOnInit(): void {
    this.disableAsideSelfDisplay = this.layout.getProp('aside.self.display') === false;
    this.brandSkin = this.layout.getProp('brand.self.theme');
    this.ulCSSClasses = this.layout.getProp('aside_menu_nav');
    this.asideMenuCSSClasses = this.layout.getStringCSSClasses('aside_menu');
    this.asideMenuHTMLAttributes = this.layout.getHTMLAttributes('aside_menu');
    this.asideMenuDropdown = this.layout.getProp('aside.menu.dropdown') ? '1' : '0';
    this.brandClasses = this.layout.getProp('brand');
    this.asideSelfMinimizeToggle = this.layout.getProp('aside.self.minimize.toggle');
    this.asideMenuScroll = this.layout.getProp('aside.menu.scroll') ? 1 : 0;
    this.location = this.loc;
  }
}
