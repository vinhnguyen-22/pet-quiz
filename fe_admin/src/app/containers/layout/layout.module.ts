import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { InlineSVGModule } from "ng-inline-svg";
import { PagesRoutingModule } from "./layout-routing";
import {
  NgbDropdownModule,
  NgbProgressbarModule,
} from "@ng-bootstrap/ng-bootstrap";

import { ExtrasModule } from "../../_theme/partials/layout/extras/extras.module";
import { CoreModule } from "../../_theme/core";
import { LayoutComponent } from "./layout.component";
import { ScriptsInitComponent } from "./init/scripts-init.component";
import { AsideComponent } from "./components/aside/aside.component";
import { FooterComponent } from "./components/footer/footer.component";
import { TopbarComponent } from "./components/topbar/topbar.component";
import { HeaderMenuComponent } from "./components/header/header-menu/header-menu.component";
import { HeaderComponent } from "./components/header/header.component";
import { HeaderMobileComponent } from "./components/header-mobile/header-mobile.component";
import { ModalChangePasswordModule } from "src/app/modules/modalChangePassword/modal.module";

@NgModule({
  declarations: [
    LayoutComponent,
    ScriptsInitComponent,
    HeaderMobileComponent,
    AsideComponent,
    FooterComponent,
    HeaderComponent,
    HeaderMenuComponent,
    TopbarComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    InlineSVGModule,
    ExtrasModule,
    NgbDropdownModule,
    NgbProgressbarModule,
    CoreModule,
    ModalChangePasswordModule,
  ],
})
export class LayoutModule {}
