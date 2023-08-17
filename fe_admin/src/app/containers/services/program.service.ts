import { environment } from './../../../environments/environment';
import { Inject, Injectable } from '@angular/core';
import { ApiService } from './api/api.service';
import { GeneralService } from './general.service';

@Injectable({
  providedIn: 'root',
})
export class ProgramService extends GeneralService {
  constructor(@Inject(ApiService) apiService) {
    super(apiService);
  }

  update = (model: any): Promise<Object> => {
    let url = environment.apiUrl + 'programs/update';
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

  remove = (programId: number): Promise<Object> => {
    let url = environment.apiUrl + 'programs/delete?programId=' + programId;
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

  getAllWithoutDetails = (model: any): Promise<Object> => {
    let url = environment.apiUrl + 'programs/getAllWithoutDetails';
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
