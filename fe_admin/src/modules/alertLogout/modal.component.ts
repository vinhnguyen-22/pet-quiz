import { Component, Injectable, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/services/auth/auth.service';
@Component({
  selector: 'app-alert',
  templateUrl: './modal.component.html',
})
@Injectable()
export class CommonModalComponent implements OnInit {
  @Input() isOpen: any = false;
  constructor(public auth: AuthService) {}
  ngOnInit(): void {}
  ngOnChanges(): void {
    if (this.isOpen) {
      alert(this.auth.message.value);
      this.auth.dialogCheckToken();
    }
  }
}
