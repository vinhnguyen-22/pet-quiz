import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { ComponentCanDeactivate } from './can-deactivate.component';

@Injectable()
export class CanDeactivateGuard implements CanDeactivate<ComponentCanDeactivate> {
  canDeactivate(component: ComponentCanDeactivate): boolean {
    if (!component.canDeactivate()) {
      if (confirm('Rời khỏi màn hình này? Dữ liệu đã nhập sẽ không được lưu lại.')) {
        return true;
      } else {
        return false;
      }
    }

    return true;
  }
}