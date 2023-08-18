import { Injectable, OnDestroy } from "@angular/core";
import { Observable, BehaviorSubject, of, Subscription } from "rxjs";
import { map, catchError, switchMap } from "rxjs/operators";
import { Router } from "@angular/router";
import { AuthHTTPService } from "./_services/auth-http";
import { LocalStorageService } from "../storage/local-storage.service";
import { ApiService } from "../api/api.service";
import { environment } from "src/environments/environment";
import { CURRENT_USER_CMS, ROLE } from "src/business/rule";

@Injectable({
  providedIn: "root",
})
export class AuthService implements OnDestroy {
  private unsubscribe: Subscription[] = [];

  currentUser$: Observable<any>;
  currentUserSubject: BehaviorSubject<any>;
  isTokenInValid: BehaviorSubject<any>;
  message: BehaviorSubject<any>;
  get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  set currentUserValue(user: any) {
    this.currentUserSubject.next(user);
  }
  API_URL = environment.apiUrl;
  constructor(
    private authHttpService: AuthHTTPService,
    private localStorageService: LocalStorageService,
    private router: Router,
    private apiService: ApiService
  ) {
    this.currentUserSubject = new BehaviorSubject<boolean>(undefined);
    this.isTokenInValid = new BehaviorSubject<boolean>(false);
    this.message = new BehaviorSubject<string>("");
    this.currentUser$ = this.currentUserSubject.asObservable();
    const subscr = this.getUserByToken().subscribe();
    this.unsubscribe.push(subscr);
    this.apiService.isCallCheckToken.subscribe((res) => {
      if (res) {
        const authData = this.localStorageService.get(CURRENT_USER_CMS);
        this.checkToken(authData);
      }
    });
  }

  login(email: string, password: string): Observable<any> {
    return this.authHttpService.login(email.trim(), password).pipe(
      map((auth: any) => {
        const result = this.setAuthFromCookie(auth);
        return result;
      }),
      switchMap(() => this.getUserByToken()),
      catchError((err) => {
        return of(err);
      })
    );
  }

  logout = (param): Promise<Object> => {
    return new Promise((resolve, reject) => {
      let url = `${this.API_URL}auth/logout`;
      this.apiService.post(url, param).subscribe(
        (res: any) => {
          this.localStorageService.delete(CURRENT_USER_CMS);
          this.currentUserSubject.next(undefined);
          this.router.navigate(["auth/login"]);
        },
        (err) => {
          this.localStorageService.delete(CURRENT_USER_CMS);
          this.currentUserSubject.next(undefined);
          this.router.navigate(["auth/login"]);
        }
      );
    });
  };

  checkToken = (token): Promise<Object> => {
    return new Promise((resolve, reject) => {
      let url = `${this.API_URL}auth/checkToken`;
      if (token) {
        this.apiService.post(url, token).subscribe(
          (res: any) => {
            if (!res.tokenValid) {
              this.message.next(res.message);
              this.removeCurrentUser();
            }
            resolve(res);
          },
          (err) => {
            this.removeCurrentUser();
            reject(err);
          }
        );
      }
    });
  };
  private removeCurrentUser() {
    this.isTokenInValid.next(true);
    this.currentUserSubject.next(undefined);
    this.localStorageService.delete(CURRENT_USER_CMS);
    this.router.navigate(["auth/login"]);
  }
  public dialogCheckToken() {
    this.message.next("");
    this.isTokenInValid.next(false);
  }
  getUserByToken(): Observable<any> {
    const auth = this.getAuthFromCookie();
    if (!auth || !auth.token) {
      return of(undefined);
    }
    return this.authHttpService.getUserByToken(auth.token).pipe(
      map((user: any) => {
        if (user) {
          this.currentUserSubject = new BehaviorSubject<any>(user);
        }
        return user;
      })
    );
  }

  private setAuthFromCookie(auth: any): boolean {
    if (auth && auth.token) {
      this.localStorageService.set(CURRENT_USER_CMS, JSON.stringify(auth));
      return true;
    }
    return false;
  }

  private getAuthFromCookie(): any {
    try {
      let token = this.localStorageService.get(CURRENT_USER_CMS);
      return token;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }

  isAdmin() {
    return this.currentUserValue?.roleId == ROLE.ADMIN;
  }
}
