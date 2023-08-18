import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { ApiService } from './api/api.service';
@Injectable({
  providedIn: 'root',
})
export class GeneralService {
  API_URL = environment.apiUrl;
  constructor(public apiService: ApiService) { }


  getByModel = (_url: any, model: any): Promise<Object> => {
    return new Promise((resolve, reject) => {
      let url = `${this.API_URL}${_url}/getAll`;
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
  update = (_url: any, model: any): Promise<Object> => {
    return new Promise((resolve, reject) => {
      let url = `${this.API_URL}${_url}`;
      if (model?.id > 0) {
        this.apiService.putWithToken(url, model).subscribe(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
      } else {
        this.apiService.postWithToken(url, model).subscribe(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
      }
    });
  };
  getItemById = (_url: any, id: any): Promise<Object> => {
    return new Promise((resolve, reject) => {
      let url = `${this.API_URL}${_url}/` + id;
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
  post = (_url: any, model: any): Promise<Object> => {
    return new Promise((resolve, reject) => {
      let url = `${this.API_URL}${_url}`;
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
  getLastId = (_url: any): Promise<Object> => {
    return new Promise((resolve, reject) => {
      let url = `${this.API_URL}${_url}/getLastId`;
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
  buildQueryDataString(data) {
    if (!data || data.length == 0) {
      return '';
    }

    const ret = [];
    for (let d in data) {
      if (data[d] || data[d] == 0) {
        ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
      }
    }
    return '?' + ret.join('&');
  }
}
