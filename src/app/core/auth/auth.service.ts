import { Injectable } from '@angular/core';
import {ApiService} from '@app/core/api/api.service';
import {ActionAuthLogin, ActionAuthLogout, AppState} from '@app/core';
import {Store} from '@ngrx/store';
import {Router} from '@angular/router';
import {AppEvent, AppEventsService} from '@app/core/app-events/app-events.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private api: ApiService,
              private router: Router,
              private events: AppEventsService,
              private store: Store<AppState>) {

    events._event.subscribe((event: AppEvent) => {
      if (event) {
        switch (event.name) {
          case 'logout':
            this.logout();
            break;
          default:
        }
      }
    })

  }

  async login(credentials) {
    const user = await this.api.post(`auth/login`, credentials).toPromise();
    this.store.dispatch(new ActionAuthLogin(user));
    return user;
  }

  async logout() {
    const logout =  await this.api.get(`auth/logout`).toPromise();
    this.store.dispatch(new ActionAuthLogout());
    return logout;
  }
}
