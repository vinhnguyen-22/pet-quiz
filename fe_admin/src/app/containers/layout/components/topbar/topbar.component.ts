import {
  Component,
  OnInit,
  AfterViewInit,
  ChangeDetectorRef,
} from "@angular/core";
import { LayoutService } from "../../../../_theme/core";
import KTLayoutQuickPanel from "../../../../../assets/js/layout/extended/quick-panel";
import KTLayoutQuickUser from "../../../../../assets/js/layout/extended/quick-user";
import KTLayoutHeaderTopbar from "../../../../../assets/js/layout/base/header-topbar";
import { KTUtil } from "../../../../../assets/js/components/util";
import { AuthService } from "src/services/auth/auth.service";
import * as signalR from "@microsoft/signalr";

@Component({
  selector: "app-topbar",
  templateUrl: "./topbar.component.html",
})
export class TopbarComponent implements OnInit, AfterViewInit {
  currentUser: any;
  systemNotificationCount: number = 0;
  extrasQuickPanelDisplay: boolean;
  extrasUserDisplay: boolean;
  extrasUserLayout: "offcanvas" | "dropdown";
  extrasLanguagesDisplay: boolean;
  constructor(
    private layout: LayoutService,
    private auth: AuthService,
    private cd: ChangeDetectorRef
  ) {
    this.currentUser = this.auth.currentUserValue;
  }

  ngOnInit(): void {
    this.extrasUserDisplay = this.layout.getProp("extras.user.display");
    this.extrasUserLayout = this.layout.getProp("extras.user.layout");
    this.extrasQuickPanelDisplay = this.layout.getProp(
      "extras.quickPanel.display"
    );

    this.getSystemNotification();
    var options = {
      transport:
        signalR.HttpTransportType.WebSockets |
        signalR.HttpTransportType.LongPolling,
      logging: signalR.LogLevel.Trace,
    };

    const connection = new signalR.HubConnectionBuilder()
      .withUrl("notify?userId=" + this.currentUser.id, options)
      .configureLogging(signalR.LogLevel.Information)
      .build();

    connection
      .start()
      .then()
      .catch(function (err) {
        return console.error(err.toString());
      });

    connection.on("SendSystemNotification", () => {
      this.getSystemNotification();
    });

    this.extrasLanguagesDisplay = this.layout.getProp(
      "extras.languages.display"
    );
  }

  getSystemNotification() {}

  ngAfterViewInit(): void {
    KTUtil.ready(() => {
      if (this.extrasQuickPanelDisplay) {
        KTLayoutQuickPanel.init("kt_quick_panel");
      }

      if (this.extrasUserDisplay && this.extrasUserLayout === "offcanvas") {
        KTLayoutQuickUser.init("kt_quick_user");
      }

      KTLayoutHeaderTopbar.init("kt_header_mobile_topbar_toggle");
    });
  }
}
