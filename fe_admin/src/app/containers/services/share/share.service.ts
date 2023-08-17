import { environment } from 'src/environments/environment';
import { CURRENT_USER_CMS, DATE_FORMAT, DEFAULT_DATE_FORMAT } from 'src/app/containers/constants';
import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalStorageService } from './../storage/local-storage.service';
@Injectable({
  providedIn: 'root',
})
export class ShareService {
  API_URL = environment.apiUrl;
  optionsUrl: string = `${this.API_URL}options`;
  constructor(public apiService: ApiService, public http: HttpClient, private localStorageService: LocalStorageService) { }
  get = (_url: any): Promise<Object> => {
    return new Promise((resolve, reject) => {
      let url = `${this.API_URL}${_url}`;
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
  getByModel = (_url: any, model: any): Promise<Object> => {
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
  getOptions = (): Promise<Object> => {
    return new Promise<Object>((resolve, reject) => {
      this.apiService.get(this.optionsUrl + '?domain=CMS').subscribe(
        (res) => {
          resolve(res);
        },
        (err) => {
          reject(err);
        }
      );
    });
  };

  uploadProgress = (files: any, path: any, type: string): Promise<Object> => {
    return new Promise((resolve, reject) => {
      let fileToUpload = <File>files[0];
      const formData = new FormData();
      formData.append('file', fileToUpload, fileToUpload.name);
      formData.append('path', path);
      formData.append('type', type);
      let url = this.API_URL + 'files';
      resolve(this.apiService.postFile(url, formData));
    });
  };

  uploadExcel(formData: FormData, type: string) {
    let headers = new HttpHeaders();
    let userLogined = this.localStorageService.get(CURRENT_USER_CMS);
    let token = userLogined ? userLogined['token'] : null;
    let url = this.API_URL;
    switch (type) {
      case 'employee':
        url += 'users/upload';
        break;
      case 'student':
        url += 'students/upload';
        break;
      case 'lesson':
        url += 'lessons/upload';
        break;
      default:
        break;
    }
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    headers = headers.set('Authorization', `Bearer ${token}`);
    const httpOptions = { headers: headers };

    return this.http.post(url, formData, httpOptions);
  }

  upload = (files: any, path: any, type: string): Promise<Object> => {
    return new Promise((resolve, reject) => {
      let fileToUpload = <File>files[0];
      const formData = new FormData();
      formData.append('file', fileToUpload, fileToUpload.name);
      formData.append('path', path);
      formData.append('type', type);
      let url = this.API_URL + 'files';
      this.apiService.postWithToken(url, formData).subscribe(
        (res) => {
          resolve(res);
        },
        (err) => {
          reject(err);
        }
      );
    });
  };

  getDateFormat(type?) {
    return type = "STUDENT_AGE" ? DATE_FORMAT : DEFAULT_DATE_FORMAT;
  }

  getProvinceByCode = (code): Promise<Object> => {
    return new Promise<Object>((resolve, reject) => {
      this.apiService.get(this.optionsUrl + '/getByProvinceCode/' + code).subscribe(
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
