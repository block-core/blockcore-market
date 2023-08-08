import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor() {}

  baseUrl() {
    return environment.apiUrl;
  }

  async categories() {
    const response = await fetch(`${environment.apiUrl}/category/root`);

    if (response.status >= 400) {
      throw new Error(response.statusText);
    }

    const result = await response.json();
    return result;
  }

  async collections() {
    const response = await fetch(`${environment.apiUrl}/collection`);

    if (response.status >= 400) {
      throw new Error(response.statusText);
    }

    const result = await response.json();
    return result;
  }
}
