import { environment } from 'src/environments/environment';
import { Inject, Injectable } from '@angular/core';

import { ApiService } from './api/api.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GeneralService } from './general.service';

@Injectable({
  providedIn: 'root',
})
export class NewService extends GeneralService {
  API_URL = environment.apiUrl + "news";
  newsSubject: BehaviorSubject<any>;
  isLoadingSubject: BehaviorSubject<boolean>;

  get newsValue(): any {
    return this.newsSubject.value;
  }

  set newsValue(user: any) {
    this.newsSubject.next(user);
  }

  constructor(@Inject(ApiService) apiService) {
    super(apiService);
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.newsSubject = new BehaviorSubject<any>([]);
  }

  resetNewsSubject() {
    this.newsSubject = new BehaviorSubject<any>([]);
  }

  getItemById = (id: number): Promise<Object> => {
    return new Promise((resolve, reject) => {
      let url = `${this.API_URL}/getNew/${id}`;
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

  getNew = (model: any): Promise<Object> => {
    return new Promise((resolve, reject) => {
      let url = `${this.API_URL}/getNews`;
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

  getNewsForCurrentUser = (model: any): Promise<Object> => {
    return new Promise((resolve, reject) => {
      var query = this.buildQueryDataString(model);

      let url = `${this.API_URL}/getNewsForCurrentUser${query}`;
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

  getNewsManagedByCurrentUser = (model: any): Promise<Object> => {
    return new Promise((resolve, reject) => {
      var page = model.pageIndex;
      var pageSize = model.pageSize;
      var newsCategory = model.category;

      let url = `${this.API_URL}/getNewsManagedByCurrentUser?page=${page}&pageSize=${pageSize}&newsCategory=${newsCategory}`;
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
    return new Promise((resolve, reject) => {
      let url = `${this.API_URL}/update`;
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

  remove = (newsId: any): Promise<Object> => {
    return new Promise((resolve, reject) => {
      var param = {
        newsId: newsId
      };

      var queryString = this.buildQueryDataString(param);
      let url = `${this.API_URL}/deleteNews${queryString}`;
      this.apiService.deleteWithToken(url).subscribe(
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
          this.newsSubject.next(res.datas);
        }
        return res;
      })
    );
  }

  markNewsAsRead = (model: any): Promise<Object> => {
    return new Promise((resolve, reject) => {
      let url = `${this.API_URL}/markNewsAsRead`;
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
