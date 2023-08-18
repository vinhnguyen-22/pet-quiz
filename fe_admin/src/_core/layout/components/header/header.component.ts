import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from "@angular/core";

import KTLayoutHeader from "src/_core/assets/js/layout/base/header";
import KTLayoutHeaderMenu from "src/_core/assets/js/layout/base/header-menu";
import { KTUtil } from "src/_core/assets/js/components/util";
import { Observable, BehaviorSubject } from "rxjs";
import { LayoutService } from "src/_core/theme/core";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit, AfterViewInit {
  headerContainerCSSClasses: string;
  headerMenuSelfDisplay: boolean;
  headerMenuSelfStatic: boolean;
  asideSelfDisplay: boolean;
  headerMenuCSSClasses: string;

  @ViewChild("ktHeaderMenu", { static: true }) ktHeaderMenu: ElementRef;
  loader$: Observable<number>;

  private loaderSubject: BehaviorSubject<number> = new BehaviorSubject<number>(
    0
  );
  constructor(private layout: LayoutService) {
    this.loader$ = this.loaderSubject;
  }

  ngOnInit(): void {
    this.headerContainerCSSClasses =
      this.layout.getStringCSSClasses("header_container");
    this.headerMenuSelfDisplay = this.layout.getProp(
      "header.menu.self.display"
    );

    this.headerMenuSelfStatic = this.layout.getProp("header.menu.self.static");
    this.asideSelfDisplay = this.layout.getProp("aside.self.display");
    this.headerMenuCSSClasses = this.layout.getStringCSSClasses("header_menu");
  }

  ngAfterViewInit(): void {
    KTUtil.ready(() => {
      KTLayoutHeader.init("kt_header", "kt_header_mobile");
      KTLayoutHeaderMenu.init("kt_header_menu", "kt_header_menu_wrapper");
    });
  }
}
