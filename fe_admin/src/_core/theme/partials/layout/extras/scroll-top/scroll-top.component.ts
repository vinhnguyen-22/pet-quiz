import { Component, OnInit, AfterViewInit } from "@angular/core";
import KTLayoutScrolltop from "src/_core/assets/js/layout/extended/scrolltop";
import { KTUtil } from "src/_core/assets/js/components/util";

@Component({
  selector: "app-scroll-top",
  templateUrl: "./scroll-top.component.html",
  styleUrls: ["./scroll-top.component.scss"],
})
export class ScrollTopComponent implements OnInit, AfterViewInit {
  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    KTUtil.ready(() => {
      // Init Scrolltop
      KTLayoutScrolltop.init("kt_scrolltop");
    });
  }
}
