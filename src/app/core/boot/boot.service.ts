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

    console.log('[BootService]:init');

    const csrfToken = await this.http.get(`${environment.apiPrefix}/security/csrfToken`).toPromise();
    const init = await this.http.get(`${environment.apiPrefix}/app/init`).toPromise();

    return _.merge(csrfToken, init);
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
