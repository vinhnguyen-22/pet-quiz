import { environment } from 'src/environments/environment';
import { ApiService } from './api/api.service';
import { Inject, Injectable } from '@angular/core';
import { GeneralService } from './general.service';
@Injectable({
    providedIn: 'root',
})
export class DistrictService extends GeneralService {
    constructor(@Inject(ApiService) apiService) {
        super(apiService);
    }

    getByProvinceCode = (provinceCode): Promise<Object> => {
        return new Promise((resolve, reject) => {
            let url = `${this.API_URL}districts/getByProvinceCode/${provinceCode}`;
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

    getByProvinceId = (provinceId): Promise<Object> => {
      return new Promise((resolve, reject) => {
          let url = `${this.API_URL}districts/getByProvinceId/${provinceId}`;
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
