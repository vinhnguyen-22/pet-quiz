import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { ApiService } from './api/api.service';
@Injectable({
  providedIn: 'root',
})
export class TeachingPlanService {
  API_URL = environment.apiUrl;
  constructor(public apiService: ApiService) {}

  getTeachingPlan = (params: any): Promise<Object> => {
    return new Promise((resolve, reject) => {
      let url = `${this.API_URL}programs/teachingPlan`;
      this.apiService.postWithToken(url, params).subscribe(
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
