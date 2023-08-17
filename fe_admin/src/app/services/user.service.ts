import { environment } from '../../../environments/environment';
import { Injectable, Inject } from '@angular/core';
import { ApiService } from './api/api.service';
import { GeneralService } from './general.service';

@Injectable({
  providedIn: 'root',
})
export class UserService extends GeneralService {
  constructor(@Inject(ApiService) apiService) {
    super(apiService);
  }

  resetPassword = (id: number): Promise<Object> => {
    return new Promise((resolve, reject) => {
      let url = environment.apiUrl + `users/reset-password?id=${id}`;
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

  changePassword = (model: any): Promise<Object> => {
    let url = environment.apiUrl + 'users/changePassword';
    return new Promise((resolve, reject) => {
      this.apiService.postWithToken(url, model).subscribe(
        (res) => {
          resolve(res);
        },
        (err) => {
          reject(err);
        }
      );
    });
  };

  update = (model: any): Promise<Object> => {
    let url = environment.apiUrl + 'users/update';

    return new Promise((resolve, reject) => {
      this.apiService.postWithToken(url, model).subscribe(
        (res) => {
          resolve(res);
        },
        (err) => {
          reject(err);
        }
      );
    });
  };

  remove = (teacherId: any): Promise<Object> => {
    let url = environment.apiUrl + `users/remove/${teacherId}`;
    return new Promise((resolve, reject) => {
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

  updateSubstituteTeacher = (model: any): Promise<Object> => {
    let url = environment.apiUrl + `users/updateSubstituteTeacher`;
    return new Promise((resolve, reject) => {
      this.apiService.postWithToken(url, model).subscribe(
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
