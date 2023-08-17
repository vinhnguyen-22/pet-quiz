import { environment } from 'src/environments/environment';
import { Inject, Injectable } from '@angular/core';
import { ApiService } from './api/api.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import { GeneralService } from './general.service';

@Injectable({
  providedIn: 'root',
})
export class FeedbackService extends GeneralService {
  API_URL = environment.apiUrl + 'feedbacks';
  feedbackSubject: BehaviorSubject<any>;
  isLoadingSubject: BehaviorSubject<boolean>;

  get feedbackValue(): any {
    return this.feedbackSubject.value;
  }

  set feedbackValue(user: any) {
    this.feedbackSubject.next(user);
  }
  constructor(@Inject(ApiService) apiService) {
    super(apiService);
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.feedbackSubject = new BehaviorSubject<any>([]);
  }

  get = (params: any): Promise<Object> => {
    return new Promise((resolve, reject) => {
      let url = `${this.API_URL}/get`;
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

  read = (id: any): Promise<Object> => {
    return new Promise((resolve, reject) => {
      let url = `${this.API_URL}/read`;
      this.apiService.postWithToken(url, { id: id }).subscribe(
        (res) => {
          let data = [...this.feedbackValue];
          let index = data.findIndex((x) => {
            x.id == id;
          });
          data.splice(index, 1);
          this.feedbackSubject.next(data);
          resolve(res);
        },
        (err) => {
          reject(err);
        }
      );
    });
  };

  public getFeedbackOnHead(): Observable<any> {
    let url = `${this.API_URL}/getFeedbackOnHead`;
    this.isLoadingSubject.next(true);
    return this.apiService.getWithToken(url).pipe(
      map((res: any) => {
        if (res) {
          this.feedbackSubject.next(res);
        }
        return res;
      }),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }
  create = (params: any): Promise<Object> => {
    return new Promise((resolve, reject) => {
      let url = `${this.API_URL}/create`;
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

  markFeedbacksAsRead = (model: any): Promise<Object> => {
    return new Promise((resolve, reject) => {
      let url = `${this.API_URL}/markFeedbacksAsRead`;
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

  public getAllUnread(param): Observable<any> {
    var queryString = this.buildQueryDataString(param);
    let url = `${this.API_URL}/getAllUnread${queryString}`;

    return this.apiService.getWithToken(url).pipe(
      map((res: any) => {
        if (res) {
          this.feedbackSubject.next(res.datas);
        }
        return res;
      })
    );
  }

  resetFeedbackSubject() {
    this.feedbackSubject = new BehaviorSubject<any>([]);
  }
}
