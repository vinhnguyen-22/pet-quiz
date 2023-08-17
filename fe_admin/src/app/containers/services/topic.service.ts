import { environment } from './../../../environments/environment';

import { Inject, Injectable } from '@angular/core';
import { GeneralService } from './general.service';
import { ApiService } from './api/api.service';

@Injectable({
  providedIn: 'root',
})
export class TopicService extends GeneralService {
  constructor(@Inject(ApiService) apiService) {
    super(apiService);
  }

  update = (model: any): Promise<Object> => {
    let url = environment.apiUrl + "topics/update"
    return new Promise((resolve, reject) => {
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
