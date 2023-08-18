import { environment } from "src/environments/environment";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { LocalStorageService } from "../../../storage/local-storage.service";
import { CURRENT_USER_CMS } from "src/business/rule";

const API_USERS_URL = `${environment.apiUrl}auth/login`;

@Injectable({
  providedIn: "root",
})
export class AuthHTTPService {
  constructor(
    private http: HttpClient,
    public storageService: LocalStorageService
  ) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(API_USERS_URL, {
      account: email,
      password,
      domain: "CMS",
    });
  }
  getHeaders = () => {
    let user = this.storageService.get(CURRENT_USER_CMS);
    let token = user ? user["token"] : null;
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", `Bearer ${token}`);
    return headers;
  };

  createUser(user: any): Observable<any> {
    return this.http.post<any>(API_USERS_URL, user);
  }

  forgotPassword(email: string): Observable<boolean> {
    return this.http.post<boolean>(`${API_USERS_URL}/forgot-password`, {
      email,
    });
  }

  getUserByToken(token): Observable<any> {
    const httpHeaders = new HttpHeaders({
      Authorization: `${token}`,
      Domain: "CMS",
    });
    return this.http.get(`${API_USERS_URL}`, {
      headers: httpHeaders,
    });
  }
}
