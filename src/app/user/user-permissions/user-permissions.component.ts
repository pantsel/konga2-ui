import { Component, OnInit } from '@angular/core';
import {ApiService} from '@app/core/api/api.service';
import {SharedUserService} from '@app/user/shared-user.service';
import {select, Store} from '@ngrx/store';
import {AppState, selectAuth} from '@app/core';
import {Observable} from 'rxjs';

@Component({
  selector: 'anms-user-permissions',
  templateUrl: './user-permissions.component.html',
  styleUrls: ['./user-permissions.component.css']
})
export class UserPermissionsComponent implements OnInit {

  allPermissions: any;
  user: any;
  auth$: Observable<any>;
  authUser: any;

  constructor(private api: ApiService,
              private store: Store<AppState>,
              private sharedUserService: SharedUserService) {
    this.auth$ = this.store.pipe(select(selectAuth));
    this.auth$.subscribe(data => {
      this.authUser = data.user;
    })

    sharedUserService._user.subscribe(user => {
      this.user = user;
      this.loadPermissions();
    })
  }

  ngOnInit() {

  }

  loadPermissions() {
    this.api.get(`permissions`)
      .subscribe(data => {
        console.log('loadPermissions =>', data);
        this.allPermissions = data;
      })
  }

  matchPermissions() {

  }

}
