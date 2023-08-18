import { Component, OnInit } from "@angular/core";
import { LayoutService } from "../../../_theme/core";

@Component({
  selector: "app-scripts-init",
  templateUrl: "./scripts-init.html",
})
export class ScriptsInitComponent implements OnInit {
  asideSelfMinimizeToggle = false;

  constructor(private layout: LayoutService) {}

  ngOnInit(): void {
    this.asideSelfMinimizeToggle = this.layout.getProp(
      "aside.self.minimize.toggle"
    );
  }
}
