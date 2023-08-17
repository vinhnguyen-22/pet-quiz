import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { ApiService } from './api/api.service';

@Injectable({
  providedIn: 'root',
})
export class StatisticalService {
  API_URL = environment.apiUrl;
  constructor(public apiService: ApiService) {}

  getByModel = (model): Promise<Object> => {
    return new Promise((resolve, reject) => {
      let url = `${this.API_URL}statistical`;
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
  getProvinceRank = (type): Promise<Object> => {
    return new Promise((resolve, reject) => {
      let url = `${this.API_URL}statistical/getProvinceRank?type=${type}`;
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
}
