
import { Component, Input, OnChanges } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.html',
})
export class LoadingComponent implements OnChanges {
  constructor(private spinner: NgxSpinnerService) { }
  @Input() isLoading: any = false;

  ngOnChanges(): void {
    if (this.isLoading) {
      this.spinner.show();
    } else {
      this.spinner.hide();
    }
  }
}
