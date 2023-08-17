import { environment } from 'src/environments/environment';
import { ApiService } from './api/api.service';
import { Inject, Injectable } from '@angular/core';
import { GeneralService } from './general.service';
@Injectable({
    providedIn: 'root',
})
export class WardService extends GeneralService {
    constructor(@Inject(ApiService) apiService) {
        super(apiService);
    }

    getByDistrictCode = (districtCode): Promise<Object> => {
        return new Promise((resolve, reject) => {
            let url = `${this.API_URL}wards/getByDistrictCode/${districtCode}`;
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

    getByDistrictId = (districtId): Promise<Object> => {
        return new Promise((resolve, reject) => {
            let url = `${this.API_URL}wards/getByDistrictId/${districtId}`;
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
