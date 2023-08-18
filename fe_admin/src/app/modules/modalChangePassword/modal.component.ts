import { ChangeDetectorRef, Component, EventEmitter, Injectable, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { KTUtil } from 'src/assets/js/components/util';
import KTPasswordMeter from 'src/assets/js/components/password';
@Component({
  selector: 'modal-change-password',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  providers: [NgbModalConfig, NgbModal],
})
@Injectable()
export class CommonModalComponent implements OnInit {
  @ViewChild('ChangePassword') private ChangePassword!: TemplateRef<CommonModalComponent>;
  @Output() close = new EventEmitter<any>();
  @Input() isOpen: boolean = false;
  formPassword: FormGroup;

  currentUser: any;

  constructor(private modalService: NgbModal, private fb: FormBuilder, private toastr: ToastrService, private cd: ChangeDetectorRef) {}

  ngOnInit(): void {}
  ngOnChanges(): void {
    if (this.isOpen) {
      let result = this.modalService.open(this.ChangePassword, {
        keyboard: true,
        backdrop: 'static',
      });
      this.initForm();

      result.shown.subscribe(() => {
        KTUtil.ready(() => {
          KTPasswordMeter.init();
        });
      });
      result.result.then((result) => {
        this.close.emit({});
      });
    }
  }

  initForm() {
    this.formPassword = this.fb.group({
      email: [this.currentUser.email],
      oldPassword: ['', Validators.compose([Validators.required])],
      newPassword: ['', Validators.compose([Validators.required])],
      rePassword: ['', Validators.compose([Validators.required])],
    });
  }
  submit() {}
  isControlValid(controlName: string): boolean {
    let control = this.formPassword.controls[controlName];
    return control.valid && (control.dirty || control.touched);
  }
  isControlInvalid(controlName: string): boolean {
    let control = this.formPassword.controls[controlName];
    return control.invalid && (control.dirty || control.touched);
  }
  controlHasError(validation: string, controlName: string) {
    const control = this.formPassword?.controls[controlName];
    return control.hasError(validation) && (control.dirty || control.touched);
  }
}
