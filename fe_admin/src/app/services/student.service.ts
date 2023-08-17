import { environment } from 'src/environments/environment';
import { Inject, Injectable } from '@angular/core';
import { ApiService } from './api/api.service';
import { GeneralService } from './general.service';

@Injectable({
  providedIn: 'root',
})
export class StudentService extends GeneralService {
  API_URL = environment.apiUrl;
  constructor(@Inject(ApiService) apiService) {
    super(apiService);
  }

  addToClass = (student): Promise<Object> => {
    return new Promise((resolve, reject) => {
      let url = `${this.API_URL}students/add-to-class`;
      this.apiService.postWithToken(url, student).subscribe(
        (res) => {
          resolve(res);
        },
        (err) => {
          reject(err);
        }
      );
    });
  };

  getStudentStore = (param): Promise<Object> => {
    return new Promise((resolve, reject) => {
      let url = `${this.API_URL}students/getStudentStore`;
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

  getStudentList = (param): Promise<Object> => {
    return new Promise((resolve, reject) => {
      let url = `${this.API_URL}students/getStudents`;
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

  create = (model: any): Promise<Object> => {
    return new Promise((resolve, reject) => {
      let url = `${this.API_URL}students/create`;
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

  getStudentById = (id: any): Promise<Object> => {
    return new Promise((resolve, reject) => {
      let url = `${this.API_URL}students/getStudentInfo?id=${id}`;
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


  saveStudent = (model: any): Promise<Object> => {
    return new Promise((resolve, reject) => {
      let url = `${this.API_URL}students/save`;
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

  remove = (studentId: any): Promise<Object> => {
    return new Promise((resolve, reject) => {
      let url = `${this.API_URL}students/remove/${studentId}`;
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

  uploadStudentMainImage = (formData: FormData, studentId: number, classId: number): Promise<Object> => {
    return new Promise((resolve, reject) => {
      let url = this.API_URL + `students/uploadImage?studentId=${studentId}&classId=${classId}&isMainImage=true`;
      this.apiService.postWithToken(url, formData).subscribe(
        (res) => {
          resolve(res);
        },
        (err) => {
          reject(err);
        }
      );
    });
  };

  removeStudentMainImage = (studentId: number, classId: number): Promise<Object> => {
    var param = {
      studentId: studentId,
      classId: classId,
    };

    return new Promise((resolve, reject) => {
      let url = this.API_URL + `students/removeMainImage`;
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
}
