import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { InlineSVGModule } from "ng-inline-svg";
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { PERFECT_SCROLLBAR_CONFIG } from "ngx-perfect-scrollbar";
import { PerfectScrollbarConfigInterface } from "ngx-perfect-scrollbar";
import { QuickPanelOffcanvasComponent } from "./offcanvas/quick-panel-offcanvas/quick-panel-offcanvas.component";
import { UserOffcanvasComponent } from "./offcanvas/user-offcanvas/user-offcanvas.component";
import { CoreModule } from "../../../core";
import { ScrollTopComponent } from "./scroll-top/scroll-top.component";
import { PipesModule } from "src/pipes/pipes.module";

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
};

@NgModule({
  declarations: [
    QuickPanelOffcanvasComponent,
    UserOffcanvasComponent,
    ScrollTopComponent,
  ],
  imports: [
    CommonModule,
    InlineSVGModule,
    PerfectScrollbarModule,
    CoreModule,
    RouterModule,
    PipesModule,
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    },
  ],
  exports: [
    QuickPanelOffcanvasComponent,
    UserOffcanvasComponent,
    ScrollTopComponent,
  ],
})
export class ExtrasModule {}
