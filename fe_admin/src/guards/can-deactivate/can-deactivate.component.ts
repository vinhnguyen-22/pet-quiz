import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-can-deactivate',
  templateUrl: './can-deactivate.component.html',
})
export abstract class ComponentCanDeactivate {
  abstract canDeactivate(): boolean;

  @HostListener('window:beforeunload', ['$event'])
  unloadPageNotification($event: any) {
    if (!this.canDeactivate()) {
      $event.returnValue = true;
    }
  }
}
