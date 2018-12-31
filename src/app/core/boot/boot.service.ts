import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class BootService {
  constructor(private http: HttpClient) {}

  async init(): Promise<any> {

    const csrfToken = await this.http.get(`${environment.apiPrefix}/security/csrfToken`).toPromise();
    const me = await this.http.get(`${environment.apiPrefix}/auth/me`).toPromise();

    return _.merge(csrfToken, {
      me: me
    });
  }

  getUrlParam(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    const results = regex.exec(location.search);
    return results === null
      ? ''
      : decodeURIComponent(results[1].replace(/\+/g, ' '));
  }
}
