import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { ApiService } from './api/api.service';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  API_URL = environment.apiUrl;
  constructor(public apiService: ApiService) {}

  getUserPermission = (userRoleId): Promise<Object> => {
    return new Promise((resolve, reject) => {
      let url = `${this.API_URL}permissions/get-by-role/${userRoleId}`;
      this.apiService.getWithToken(url).subscribe(
        (res) => {
          resolve(res);
        },
        (err) => {
          reject(err);
        }
      );
    });
  };

  getPermission = (): Promise<Object> => {
    return new Promise((resolve, reject) => {
      let url = `${this.API_URL}permissions`;
      this.apiService.getWithToken(url).subscribe(
        (res) => {
          resolve(res);
        },
        (err) => {
          reject(err);
        }
      );
    });
  };

  setPermission = (param): Promise<Object> => {
    return new Promise((resolve, reject) => {
      let url = `${this.API_URL}permissions`;
      this.apiService.postWithToken(url, param).subscribe(
        (res) => {
          resolve(res);
        },
        (err) => {
          reject(err);
        }
      );
    });
  };
  updateEndpoint = (param): Promise<Object> => {
    return new Promise((resolve, reject) => {
      let url = `${this.API_URL}permissions/update`;
      this.apiService.postWithToken(url, param).subscribe(
        (res) => {
          resolve(res);
        },
        (err) => {
          reject(err);
        }
      );
    });
  };
}
