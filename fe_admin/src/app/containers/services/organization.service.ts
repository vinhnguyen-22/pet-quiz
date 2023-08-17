import { environment } from './../../../environments/environment';
import { Injectable, Inject } from '@angular/core';
import { GeneralService } from './general.service';

import { ApiService } from './api/api.service';

@Injectable({
  providedIn: 'root',
})
export class OrganizationService extends GeneralService {
  constructor(@Inject(ApiService) apiService) {
    super(apiService);
  }

  getDataForExcel = (param): Promise<Object> => {
    return new Promise((resolve, reject) => {
      let url = `${this.API_URL}organizations/export`;
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

  getOrganizations = (organId: number): Promise<Object> => {
    return new Promise((resolve, reject) => {
      let url = `${this.API_URL}organizations/getOrganization/${organId}`;
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

  getAllSchools = (searchTerm, provinceCode, districtCode): Promise<Object> => {
    var data = {
      searchTerm: searchTerm,
      provinceCode: provinceCode,
      districtCode: districtCode,
    };

    var queryString = this.buildQueryDataString(data);

    return new Promise((resolve, reject) => {
      let url = `${this.API_URL}organizations/getAllSchools${queryString}`;
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

  getManagedEnglishCenters = (): Promise<Object> => {
    return new Promise((resolve, reject) => {
      let url = `${this.API_URL}organizations/getManagedEnglishCenters`;
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

  applyKidsenglish = (organId: any): Promise<Object> => {
    return new Promise((resolve, reject) => {
      let url = `${this.API_URL}organizations/applyKidsenglish/` + organId;
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
  activeCenter = (model: any): Promise<Object> => {
    return new Promise((resolve, reject) => {
      let url = `${this.API_URL}organizations/activeCenter/`;
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
  create = (params: any): Promise<Object> => {
    return new Promise((resolve, reject) => {
      let url = `${this.API_URL}organizations/update`;
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
  getAllOrganizations = (params: any): Promise<Object> => {
    return new Promise((resolve, reject) => {
      let url = `${this.API_URL}organizations/getAllOrganizations`;
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

  getOrganSelect = (): Promise<Object> => {
    return new Promise((resolve, reject) => {
      let url = `${this.API_URL}organizations/getAllSchools`;
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

  deleteSchool = (schoolId): Promise<Object> => {
    var param = {
      schoolId: schoolId,
    };

    var queryString = this.buildQueryDataString(param);
    return new Promise((resolve, reject) => {
      let url = `${this.API_URL}organizations/removeSchool${queryString}`;
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

  resetPassword = (id: number): Promise<Object> => {
    return new Promise((resolve, reject) => {
      let url = environment.apiUrl + `organizations/reset-password?id=${id}`;
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
