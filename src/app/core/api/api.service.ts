import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(public http: HttpClient) {}

  get(endpoint: string, params?: any, options?: any) {
    // make request
    if (!options) {
      options = {
        params: new HttpParams()
      };
    }

    // Support easy query params for GET requests
    if (params) {
      options.params = new HttpParams();
      for (const k in params) {
        if (params.hasOwnProperty(k)) {
          options.params = options.params.set(k, params[k]);
        }
      }
      // Set the search field if we have params and don't already have
      // a search field set in options.
      // options.search = !options.search && p || options.search;
    }

    return this.http.get(
      `${environment.apiUrl}${environment.apiPrefix}/${endpoint}`,
      options
    );
  }

  post(endpoint: string, body: any, options?: any) {
    Object.assign(body, {
      _csrf: window['_csrf']
    });

    return this.http.post(
      `${environment.apiUrl}${environment.apiPrefix}/${endpoint}`,
      body,
      options
    );
  }

  put(endpoint: string, body: any, options?: any) {
    return this.http.put(
      `${environment.apiUrl}${environment.apiPrefix}/${endpoint}`,
      body,
      options
    );
  }

  delete(endpoint: string, options?: any) {
    return this.http.delete(
      `${environment.apiUrl}${environment.apiPrefix}/${endpoint}`,
      options
    );
  }

  patch(endpoint: string, body: any, options?: any) {
    return this.http.patch(
      `${environment.apiUrl}${environment.apiPrefix}/${endpoint}`,
      body,
      options
    );
  }
}
