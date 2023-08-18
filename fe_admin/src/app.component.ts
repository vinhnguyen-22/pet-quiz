import {
  Component,
  ChangeDetectionStrategy,
  OnDestroy,
  OnInit,
} from "@angular/core";

import { Router, NavigationEnd } from "@angular/router";
import { Subscription } from "rxjs";
import { AuthService } from "src/services/auth/auth.service";
import { CustomModalService } from "src/services/modal.service";
import { SplashScreenService } from "./_core/theme/partials/layout/splash-screen/splash-screen.service";

@Component({
  selector: "body[root]",
  styleUrls: ["./app.component.scss"],
  templateUrl: "./app.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit, OnDestroy {
  private unsubscribe: Subscription[] = [];
  currentUser: any;

  constructor(
    private splashScreenService: SplashScreenService,
    private router: Router,
    public auth: AuthService,
    public modal: CustomModalService
  ) {
    this.currentUser = this.auth.currentUserValue;
  }

  ngOnInit() {
    const routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.splashScreenService.hide();
        window.scrollTo(0, 0);
        setTimeout(() => {
          document.body.classList.add("page-loaded");
        }, 500);
      }
    });
    this.unsubscribe.push(routerSubscription);
  }

  ngOnDestroy(): void {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
  closeModal = (type) => {
    this.modal.Dialog(type, false, {});
  };
}
