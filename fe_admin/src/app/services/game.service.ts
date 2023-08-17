import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';

import { ApiService } from './api/api.service';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  constructor(public apiService: ApiService) { }
  API_URL = environment.apiUrl;

  getById = (id: any): Promise<Object> => {
    return new Promise((resolve, reject) => {
      let url = `${this.API_URL}games/get?id=${id}&code=''`;
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

  getGameType = (): Promise<Object> => {

    return new Promise((resolve, reject) => {
      let url = `${this.API_URL}games/getGameType`;
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
  
  get = (params: any): Promise<Object> => {
    return new Promise((resolve, reject) => {
      let url = `${this.API_URL}games/getAll`;
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

  update = (game: any): Promise<Object> => {
    return new Promise((resolve, reject) => {
      let url = `${this.API_URL}games/update`;
      this.apiService.postWithToken(url, game).subscribe(
        (res) => {
          resolve(res);
        },
        (err) => {
          reject(err);
        }
      );
    });
  };

  remove = (gameId: any): Promise<Object> => {
    return new Promise((resolve, reject) => {
      let url = `${this.API_URL}games/${gameId}`;
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
