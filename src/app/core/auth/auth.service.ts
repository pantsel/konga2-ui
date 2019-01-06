import { Injectable } from '@angular/core';
import {ApiService} from '@app/core/api/api.service';
import {ActionAuthLogin, ActionAuthLogout, AppState, selectAuth} from '@app/core';
import {select, Store} from '@ngrx/store';
import {Router} from '@angular/router';
import {AppEvent, AppEventsService} from '@app/core/app-events/app-events.service';
import {Observable} from 'rxjs';
import * as _ from 'lodash';
import {NgxPermissionsService, NgxRolesService} from 'ngx-permissions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  auth$: Observable<any>;

  authUser: any;

  constructor(private api: ApiService,
              private router: Router,
              private permissionsService: NgxPermissionsService,
              private rolesService: NgxRolesService,
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

    // Act on auth events
    this.auth$ = this.store.pipe(select(selectAuth));
    this.auth$.subscribe(auth => {
      if (auth.isAuthenticated) {
        // Load permissions
        this.authUser = auth.user;
        this.permissionsService.loadPermissions(_.get(auth, 'user.isSuperAdmin') ? ['superAdmin'] : this.getAuthUserPermissions());

        console.log(`[DEBUG] authUser:permissions =>`, this.permissionsService.getPermissions())
      }


    })

  }

  hasPermission(permission) {
    return this.getAuthUserPermissions().indexOf(permission) > -1;
  }

  getAuthUserPermissions() {
    const permissions = [];
    Object.keys(_.get(this.authUser, 'permissions')).forEach(key => {
      this.authUser.permissions[key].forEach(permission => {
        permissions.push(key + permission.charAt(0).toUpperCase() + permission.slice(1));
      });
    })

    return permissions;
  }

  public getAuthUser() {
    return this.authUser;
  }

  public updateStoredUser(user) {
    this.store.dispatch(new ActionAuthLogin(user));
  }

  async login(credentials) {
    const user = await this.api.post(`auth/login`, credentials).toPromise();
    this.store.dispatch(new ActionAuthLogin(user));
    return user;
  }

  setLoggedIn(user) {
    this.store.dispatch(new ActionAuthLogin(user));
  }

  async logout() {
    const logout =  await this.api.get(`auth/logout`).toPromise();
    this.store.dispatch(new ActionAuthLogout());
    return logout;
  }
}
