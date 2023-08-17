import { environment } from 'src/environments/environment';
import { Inject, Injectable } from '@angular/core';

import { ApiService } from './api/api.service';
import { GeneralService } from './general.service';

@Injectable({
  providedIn: 'root',
})
export class LessonService extends GeneralService {
  API_URL = environment.apiUrl + 'lessons';
  constructor(@Inject(ApiService) apiService) {
    super(apiService);
  }

  get = (filter: any): Promise<Object> => {
    return new Promise((resolve, reject) => {
      let url = `${this.API_URL}/getAll`;
      this.apiService.postWithToken(url, filter).subscribe(
        (res) => {
          resolve(res);
        },
        (err) => {
          reject(err);
        }
      );
    });
  };

  getById = (id: any): Promise<Object> => {
    return new Promise((resolve, reject) => {
      let url = `${this.API_URL}/${id}`;
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

  getLesson = (id: any, language): Promise<Object> => {
    var param = {
      lessonId: id,
      language: language,
    };
    var queryString = this.buildQueryDataString(param);

    return new Promise((resolve, reject) => {
      let url = `${this.API_URL}/getLesson${queryString}`;
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

  getLessonSyllabus = (id: number) => {
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

  getLessonSyllabusById = (id: number, programId, topicId, language) => {
    var param = {
      lessonId: id,
      language: language,
      programId: programId,
      topicId: topicId,
    };
    var queryString = this.buildQueryDataString(param);

    return new Promise((resolve, reject) => {
      let url = `${this.API_URL}/getLessonSyllabus${queryString}`;
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

  update = (param: any): Promise<Object> => {
    return new Promise((resolve, reject) => {
      let url = `${this.API_URL}/update`;
      this.apiService.postWithToken(url, param).subscribe(
        (res) => {
          resolve(res);
        },
        (err) => {
          reject(err);
        }
      );
    });
  };

  changeStatus = (param: any): Promise<Object> => {
    return new Promise((resolve, reject) => {
      let url = `${this.API_URL}/change-status`;
      this.apiService.postWithToken(url, param).subscribe(
        (res) => {
          resolve(res);
        },
        (err) => {
          reject(err);
        }
      );
    });
  };
  delete = (lessonId: any): Promise<Object> => {
    return new Promise((resolve, reject) => {
      let url = `${this.API_URL}/delete/${lessonId}`;
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

  deleteActivity = (sectionId: any, activityId: any): Promise<Object> => {
    return new Promise((resolve, reject) => {
      var model = {
        sectionId,
        activityId,
      };
      let url = `${this.API_URL}/delete-activity`;
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
