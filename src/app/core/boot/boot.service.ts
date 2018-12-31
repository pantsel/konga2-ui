import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BootService {
  constructor(private http: HttpClient) {}

  async init(): Promise<any> {

    const csrfToken = await this.http.get(`${environment.apiUrl}/security/csrfToken`).toPromise();
    const me = await this.http.get(`${environment.apiUrl}/api/v1/auth/me`).toPromise();

    return csrfToken;
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
