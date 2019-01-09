import { Component, OnInit } from '@angular/core';
import {AppState, NotificationService, selectAuth, selectIsAuthenticated} from '@app/core';
import {TranslateService} from '@ngx-translate/core';
import {DialogService} from '@app/core/dialog/dialog.service';
import {select, Store} from '@ngrx/store';
import {KongApiService} from '@app/core/api/kong-api.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'anms-kong-base',
  templateUrl: './kong-base.component.html',
  styleUrls: ['./kong-base.component.css']
})
export abstract class KongBaseComponent implements OnInit {

  authUser: any;
  auth$: Observable<any>;
  isAuthenticated$: Observable<boolean>;

  constructor(public api: KongApiService,
              public notificationService: NotificationService,
              public translate: TranslateService,
              public dialog: DialogService,
              public store: Store<AppState>) {
    this.auth$ = this.store.pipe(select(selectAuth));
    this.auth$.subscribe(data => {
      this.authUser = data.user;
    })

    this.isAuthenticated$ = this.store.pipe(select(selectIsAuthenticated));
    this.isAuthenticated$.subscribe(data => {
      console.log('[DEBUG] [KongBaseComponent] Authenticated state changed =>', data)
    })
  }

  ngOnInit() {
  }

}
