
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
@Injectable({
    providedIn: 'root',
})
export class ToastrNotification {

    constructor(private toastr: ToastrService) { }
    toastrError(title, message) {
        this.toastr.error(title, message);
    }
    toastrWarning(title, message) {
        this.toastr.warning(title, message);
    }
    toastrSuccess(title, message) {
        this.toastr.success(title, message);
    }
}
