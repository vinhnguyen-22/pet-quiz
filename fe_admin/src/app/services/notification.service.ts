import { ApiService } from './api/api.service';
import { Inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GeneralService } from './general.service';

@Injectable({
  providedIn: 'root',
})
export class NotificationService extends GeneralService {
  API_URL = `${environment.apiUrl}notifications`;
  notiSubject: BehaviorSubject<any>;
  isLoadingSubject: BehaviorSubject<boolean>;

  get notiValue(): any {
    return this.notiSubject.value;
  }

  set notiValue(user: any) {
    this.notiSubject.next(user);
  }

  constructor(@Inject(ApiService) apiService) {
    super(apiService);
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.notiSubject = new BehaviorSubject<any>([]);
  }


  resetNotiSubject() {
    this.notiSubject = new BehaviorSubject<any>([]);
  }

  getItemById = (id: any): Promise<Object> => {
    return new Promise((resolve, reject) => {
      let url = `${this.API_URL}/get/${id}`;
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


  public getAllUnread(param): Observable<any> {
    let url = `${this.API_URL}/getAllUnread`;

    return this.apiService.getWithToken(url).pipe(
      map((res: any) => {
        if (res) {
          this.notiSubject.next(res.datas);
        }
        return res;
      })
    );
  }

  markNotificationsAsRead = (model: any): Promise<Object> => {
    return new Promise((resolve, reject) => {
      let url = `${this.API_URL}/markNotificationsAsRead`;
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


  getNotificationsManagedByCurrentUser = (model: any): Promise<Object> => {
    var queryString = this.buildQueryDataString(model);

    return new Promise((resolve, reject) => {
      let url = `${this.API_URL}/getNotificationsManagedByCurrentUser${queryString}`;
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


  update = (params: any): Promise<Object> => {
    return new Promise((resolve, reject) => {
      let url = `${this.API_URL}/updateNotification`;
      this.apiService.postWithToken(url, params).subscribe(
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
