import { environment } from './../../../environments/environment';

import { Inject, Injectable } from '@angular/core';
import { GeneralService } from './general.service';
import { ApiService } from './api/api.service';

@Injectable({
  providedIn: 'root',
})
export class TopicSkillService extends GeneralService {
  constructor(@Inject(ApiService) apiService) {
    super(apiService);
  }

  getByTopicId = (topicId): Promise<Object> => {
    var param = {
      topicId: topicId
    };

    var queryString = this.buildQueryDataString(param);
    return new Promise((resolve, reject) => {
      let url = `${this.API_URL}topicSkills/getByTopicId${queryString}`;
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

  update = (model: any): Promise<Object> => {
    let url = environment.apiUrl + "topicSkills/update"
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
