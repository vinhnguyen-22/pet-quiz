import { environment } from 'src/environments/environment';
import { ApiService } from './api/api.service';
import { Inject, Injectable } from '@angular/core';
import { GeneralService } from './general.service';
@Injectable({
    providedIn: 'root',
})
export class CustomerService extends GeneralService {
    constructor(@Inject(ApiService) apiService) {
        super(apiService);
    }
    API_URL = environment.apiUrl + "customers";
    get = (): Promise<Object> => {
        return new Promise((resolve, reject) => {
            let url = `${this.API_URL}`;
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
