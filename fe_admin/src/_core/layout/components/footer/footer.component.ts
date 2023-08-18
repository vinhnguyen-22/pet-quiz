import { Component, OnInit, AfterViewInit } from "@angular/core";
import KTLayoutFooter from "src/_core/assets/js/layout/base/footer";
import { LayoutService } from "src/_core/theme/core";

@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.scss"],
})
export class FooterComponent implements OnInit, AfterViewInit {
  footerContainerCSSClasses: string;
  currentYear: string;

  constructor(private layout: LayoutService) {
    const currentDate = new Date();
    this.currentYear = currentDate.getFullYear().toString();
  }

  ngOnInit(): void {
    this.footerContainerCSSClasses =
      this.layout.getStringCSSClasses("footer_container");
  }

  ngAfterViewInit() {
    // Init Footer
    KTLayoutFooter.init("kt_footer");
  }
}
