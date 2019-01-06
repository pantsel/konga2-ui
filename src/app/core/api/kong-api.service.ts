import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {TranslateService} from '@ngx-translate/core';
import {environment} from '@env/environment';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class KongApiService {

  baseUrl = environment.apiUrl + '/kong';
  
  constructor(public http: HttpClient, private translate: TranslateService) {
    
  }

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
      `${this.baseUrl}/${endpoint}`,
      options
    );
  }

  post(endpoint: string, body: any, options?: any) {
    Object.assign(body, {
      _csrf: window['_csrf']
    });

    return this.http.post(
      `${this.baseUrl}/${endpoint}`,
      body,
      options
    );
  }

  put(endpoint: string, body: any, options?: any) {
    return this.http.put(
      `${this.baseUrl}/${endpoint}`,
      body,
      options
    );
  }

  delete(endpoint: string, options?: any) {
    endpoint += `?_csrf=${window['_csrf']}`

    return this.http.delete(
      `${this.baseUrl}/${endpoint}`,
      options
    );
  }

  patch(endpoint: string, body: any, options?: any) {
    Object.assign(body, {
      _csrf: window['_csrf']
    });
    return this.http.patch(
      `${this.baseUrl}/${endpoint}`,
      body,
      options
    );
  }

  getErrorMessage(error) {
    switch (error.status) {
      case 401:
        return this.translate.instant('errors.login.unauthorized');
        break;
      default:
        const msg = _.get(error, 'error.message', error.statusText) || 'An unknown error occured.';
        return this.translate.instant(msg);
    }
  }
}
