import { environment } from 'src/environments/environment';
import { ApiService } from './api/api.service';
import { Inject, Injectable } from '@angular/core';
import { GeneralService } from './general.service';
@Injectable({
  providedIn: 'root',
})
export class ClassService extends GeneralService {
  constructor(@Inject(ApiService) apiService) {
    super(apiService);
  }
  API_URL = environment.apiUrl;

  getLastClassId = (): Promise<Object> => {
    return new Promise((resolve, reject) => {
      let url = `${this.API_URL}classes/getLastId`;
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

  getClassDetail = (id: any): Promise<Object> => {
    return new Promise((resolve, reject) => {
      let url = `${this.API_URL}classes/getClassDetail/${id}`;
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


  getClasses = (model: any): Promise<Object> => {
    return new Promise((resolve, reject) => {
      let url = `${this.API_URL}classes/getClasses`;
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

  getClassLabel = (schoolId): Promise<Object> => {
    return new Promise((resolve, reject) => {
      let url = `${this.API_URL}classes/getClassLabel/${schoolId}`;
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

  getManagedClassesBySchoolId = (schoolId: any): Promise<Object> => {
    return new Promise((resolve, reject) => {
      let url = ``;
      if (schoolId != null) {
        url = `${this.API_URL}classes/getManagedClassesBySchoolId?schoolId=${schoolId}`;
      } else {
        url = `${this.API_URL}classes/getManagedClassesBySchoolId`;
      }

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

  getByCurrentOrganizationOfUser = (): Promise<Object> => {
    return new Promise((resolve, reject) => {
      let url = ``;
      url = `${this.API_URL}classes/getByCurrentOrganizationOfUser`;

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

  remove = (classId: any): Promise<Object> => {
    return new Promise((resolve, reject) => {
      let url = `${this.API_URL}classes/remove/${classId}`;
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
}
