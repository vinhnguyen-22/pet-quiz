import { environment } from 'src/environments/environment';
import { Injectable, Inject } from '@angular/core';
import { GeneralService } from './general.service';

import { ApiService } from './api/api.service';

@Injectable({
    providedIn: 'root',
})
export class DocumentActivityService extends GeneralService {
    constructor(@Inject(ApiService) apiService) {
        super(apiService);
    }

    API_URL = environment.apiUrl + "documentActivities";

    get = (model: any): Promise<Object> => {
        return new Promise((resolve, reject) => {
            let url = `${this.API_URL}/get`;
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
