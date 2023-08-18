import { NgModule, APP_INITIALIZER } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";
import { ClipboardModule } from "ngx-clipboard";
import { TranslateModule } from "@ngx-translate/core";
import { InlineSVGModule } from "ng-inline-svg";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
// Highlight JS
import { HighlightModule, HIGHLIGHT_OPTIONS } from "ngx-highlightjs";
import { ToastrModule } from "ngx-toastr";
import { AuthService } from "src/services/auth/auth.service";
import { AlertModule } from "./modules/alertLogout/modal.module";
import { ModalNewModule } from "./modules/modal-new/modal-new.module";
import { SplashScreenModule } from "./_core/theme/partials/layout/splash-screen/splash-screen.module";
import { CanDeactivateGuard } from "./guards/can-deactivate/can-deactivate.guard";
function appInitializer(authService: AuthService) {
  return () => {
    return new Promise((resolve) => {
      authService.getUserByToken().subscribe().add(resolve);
    });
  };
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SplashScreenModule,
    TranslateModule.forRoot(),
    HttpClientModule,
    HighlightModule,
    ClipboardModule,
    AppRoutingModule,
    InlineSVGModule.forRoot(),
    ToastrModule.forRoot(),
    NgbModule,
    AlertModule,
    ModalNewModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializer,
      multi: true,
      deps: [AuthService],
    },
    CanDeactivateGuard,
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: {
        coreLibraryLoader: () => import("highlight.js/lib/core"),
        languages: {
          xml: () => import("highlight.js/lib/languages/xml"),
          typescript: () => import("highlight.js/lib/languages/typescript"),
          scss: () => import("highlight.js/lib/languages/scss"),
          json: () => import("highlight.js/lib/languages/json"),
        },
      },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
