import { Component, OnInit, AfterViewInit } from "@angular/core";
import { LayoutService } from "../../../../_metronic/core";

@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.scss"],
})
export class FooterComponent implements OnInit {
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
}
