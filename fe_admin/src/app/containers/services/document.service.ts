import { environment } from 'src/environments/environment';
import { Injectable, Inject } from '@angular/core';
import { GeneralService } from './general.service';

import { ApiService } from './api/api.service';

@Injectable({
  providedIn: 'root',
})
export class DocumentService extends GeneralService {
  constructor(@Inject(ApiService) apiService) {
    super(apiService);
  }

  API_URL = environment.apiUrl;


  updateDocumentPosition = (model: any): Promise<Object> => {
    return new Promise((resolve, reject) => {
      let url = `${this.API_URL}documents/updateDocumentPosition`;
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

  getDocumentsForLibrary = (model: any): Promise<Object> => {
    return new Promise((resolve, reject) => {
      let url = `${this.API_URL}documents/getDocumentsForLibrary`;
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

  getDocumentsForLibraryPagination = (model: any): Promise<Object> => {
    return new Promise((resolve, reject) => {
      let url = `${this.API_URL}documents/getDocumentsForLibraryPagination`;
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

  createDocument = (model: any): Promise<Object> => {
    return new Promise((resolve, reject) => {
      let url = `${this.API_URL}documents/create`;
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

  remove = (documentId: any): Promise<Object> => {
    return new Promise((resolve, reject) => {
      let url = `${this.API_URL}documents/${documentId}`;
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
