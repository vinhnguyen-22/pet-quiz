import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class LocalStorageService {
  get = (key: string) => {
    let value = localStorage.getItem(key);
    try {
      return JSON.parse(value || '');
    } catch (e) {
      return value;
    }
  };

  set = (key: string, value: any) => { 
    if (value && typeof value === 'object') {
      localStorage.setItem(key, JSON.stringify(value));
    } else {
      localStorage.setItem(key, value);
    }
  };

  delete = (key: string) => {
    localStorage.removeItem(key);
  };

  clearAll = () => {
    localStorage.clear();
  };
}
