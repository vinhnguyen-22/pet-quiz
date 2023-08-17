import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class SessionStorageService {
  get = (key: string) => {
    let value = sessionStorage.getItem(key);
    try {
      return JSON.parse(value || '');
    } catch (e) {
      return value;
    }
  };

  set = (key: string, value: any) => { 
    if (value && typeof value === 'object') {
      sessionStorage.setItem(key, JSON.stringify(value));
    } else {
      sessionStorage.setItem(key, value);
    }
  };

  delete = (key: string) => {
    sessionStorage.removeItem(key);
  };

  clearAll = () => {
    sessionStorage.clear();
  };
}
