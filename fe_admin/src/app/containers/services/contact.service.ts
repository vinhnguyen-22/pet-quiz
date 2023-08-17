import { environment } from 'src/environments/environment';
import { ApiService } from './api/api.service';
import { Inject, Injectable } from '@angular/core';
import { GeneralService } from './general.service';
@Injectable({
  providedIn: 'root',
})
export class ContactService extends GeneralService {
  constructor(@Inject(ApiService) apiService) {
    super(apiService);
  }
  API_URL = environment.apiUrl + 'contacts';
  getAll = (): Promise<Object> => {
    return new Promise((resolve, reject) => {
      let url = `${this.API_URL}/getAll`;
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
  updateContacts = (model): Promise<Object> => {
    return new Promise((resolve, reject) => {
      let url = `${this.API_URL}/updateContacts`;
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
