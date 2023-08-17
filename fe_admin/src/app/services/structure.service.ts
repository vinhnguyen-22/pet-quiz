import { environment } from './../../../environments/environment';
import { Inject, Injectable } from '@angular/core';
import { ApiService } from './api/api.service';
import { GeneralService } from './general.service';

@Injectable({
  providedIn: 'root',
})
export class StructureService extends GeneralService {
  constructor(@Inject(ApiService) apiService) {
    super(apiService);
  }
}
