import { KTUtil } from 'src/assets/js/components/util';
import KTPasswordMeter from 'src/assets/js/components/password';
import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/containers/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  messageError: string = '';
  user: any = {
    account: '',
    password: '',
  };
  loginForm: FormGroup;
  returnUrl: string;
  isLoading$: Observable<boolean>;
  private unsubscribe: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    if (this.authService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.initForm();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'.toString()] || '/';
  }

  get f() {
    return this.loginForm.controls;
  }

  initForm() {
    this.loginForm = this.fb.group({
      account: [this.user.account, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(320)])],
      password: [this.user.password, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(100)])],
    });
  }

  ngAfterViewInit() {
    KTUtil.ready(() => {
      KTPasswordMeter.init();
    });
  }
  submit() {
    const loginSubscr = this.authService.login(this.f.account.value, this.f.password.value).subscribe(
      (res: any) => {
        if (res.id) {
          this.router.navigate([this.returnUrl]);
        } else {
          this.messageError = res.error.message || res.error;
          this.cd.detectChanges();
        }
      },
      (err) => {
        this.messageError = err.error.message || err.error;
      }
    );
    this.unsubscribe.push(loginSubscr);
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
  isControlValid(controlName: string): boolean {
    let control = this.loginForm.controls[controlName];
    return control.valid && (control.dirty || control.touched);
  }
  isControlInvalid(controlName: string): boolean {
    let control = this.loginForm.controls[controlName];
    return control.invalid && (control.dirty || control.touched);
  }
}
