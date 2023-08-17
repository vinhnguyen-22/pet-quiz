import { environment } from './../../../environments/environment';

import { Inject, Injectable } from '@angular/core';
import { GeneralService } from './general.service';
import { ApiService } from './api/api.service';

@Injectable({
  providedIn: 'root',
})
export class SystemNotificationService extends GeneralService {
  constructor(@Inject(ApiService) apiService) {
    super(apiService);
  }

  getUnreadSystemNotificationsCount() {
    let url = environment.apiUrl + "systemNotification/getUnreadSystemNotificationsCount"

    return new Promise((resolve, reject) => {
      this.apiService.getWithToken(url).subscribe(
        (res) => {
          resolve(res);
        },
        (err) => {
          reject(err);
        }
      );
    }); 
  }
  // public getNotiOnHead(params: any): Observable<any> {
  //   let url = `${this.API_URL}/getNotiOnHead`;

  //   return this.apiService.postWithToken(url, params).pipe(
  //     map((res: any) => {
  //       if (res) {
  //         this.notiSubject.next(res);
  //       }
  //       return res;
  //     })
  //   );
  // }
}
