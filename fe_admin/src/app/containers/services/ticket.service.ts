import { environment } from 'src/environments/environment';
import { Inject, Injectable } from '@angular/core';
import { ApiService } from './api/api.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import { GeneralService } from './general.service';

@Injectable({
  providedIn: 'root',
})
export class TicketService extends GeneralService {
  API_URL = environment.apiUrl + 'tickets';
  ticketSubject: BehaviorSubject<any>;
  isLoadingSubject: BehaviorSubject<boolean>;

  get ticketValue(): any {
    return this.ticketSubject.value;
  }

  set ticketValue(user: any) {
    this.ticketSubject.next(user);
  }
  
  constructor(@Inject(ApiService) apiService) {
    super(apiService);
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.ticketSubject = new BehaviorSubject<any>([]);
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

  resetSupportTicketSubject() {
    this.ticketSubject = new BehaviorSubject<any>([]);
  }

  public getAllUnread(param): Observable<any> {
    var queryString = this.buildQueryDataString(param);
    let url = `${this.API_URL}/getAllUnread${queryString}`;

    return this.apiService.getWithToken(url).pipe(
      map((res: any) => {
        if (res) {
          this.ticketSubject.next(res.datas);
        }
        return res;
      })
    );
  }

  markSupportTicketsAsRead = (model: any): Promise<Object> => {
    return new Promise((resolve, reject) => {
      let url = `${this.API_URL}/markSupportTicketsAsRead`;
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

  // public getTicketOnHead(): Observable<any> {
  //   let url = `${this.API_URL}/getTicketOnHead`;

  //   this.isLoadingSubject.next(true);
  //   return this.apiService.getWithToken(url).pipe(
  //     map((res: any) => {
  //       if (res) {
  //         this.ticketSubject.next(res);
  //       }
  //       return res;
  //     }),
  //     finalize(() => this.isLoadingSubject.next(false))
  //   );
  // }
  // read = (id: any): Promise<Object> => {
  //   return new Promise((resolve, reject) => {
  //     let url = `${this.API_URL}/read`;
  //     this.apiService.postWithToken(url, { id: id }).subscribe(
  //       (res) => {
  //         let data = [...this.ticketValue];
  //         let index = data.findIndex((x) => {
  //           x.id == id;
  //         });
  //         data.splice(index, 1);
  //         this.ticketSubject.next(data);
  //         resolve(res);
  //       },
  //       (err) => {
  //         reject(err);
  //       }
  //     );
  //   });
  // };

  updateStatus = (id: any): Promise<Object> => {
    return new Promise((resolve, reject) => {
      let url = `${this.API_URL}/update/${id}`;
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
}
