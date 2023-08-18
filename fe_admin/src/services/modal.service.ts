import { Injectable, OnDestroy } from '@angular/core';
import { Observable, BehaviorSubject, Subscription } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class CustomModalService implements OnDestroy {
  private unsubscribe: Subscription[] = [];
  show$: Observable<any>;
  show: BehaviorSubject<any>;
  isLoadingSubject: BehaviorSubject<boolean>;

  get currentUserValue(): any {
    return this.show.value;
  }

  set currentUserValue(model: any) {
    this.show.next(model);
  }

  constructor() {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.show = new BehaviorSubject<any>({ isChangePassword: false, isNew: false });
    this.show$ = this.show.asObservable();
  }

  public Dialog(type, isOpen, data) {
    if (type == 'changePassword') {
      this.show = new BehaviorSubject<any>({ isNew: false, isChangePassword: isOpen, data: data });
    } else if (type == 'new') {
      this.show = new BehaviorSubject<any>({ isNew: isOpen, isChangePassword: false, data: data });
    }
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
