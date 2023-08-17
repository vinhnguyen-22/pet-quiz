import { ApiService } from './api/api.service';
import { Inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { GeneralService } from './general.service';

@Injectable({
  providedIn: 'root',
})
export class ParentService extends GeneralService {
  constructor(@Inject(ApiService) apiService) {
    super(apiService);
  }

  API_URL = `${environment.apiUrl}parents`;

  getAll = (params): Promise<Object> => {
    return new Promise((resolve, reject) => {
      let url = `${this.API_URL}/get-all`;
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
