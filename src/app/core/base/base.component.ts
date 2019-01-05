import { OnInit } from '@angular/core';
import {ApiService} from '@app/core/api/api.service';
import {AppState, NotificationService, selectAuth} from '@app/core';
import {TranslateService} from '@ngx-translate/core';
import {select, Store} from '@ngrx/store';
import {DialogService} from '@app/core/dialog/dialog.service';
import {Observable} from 'rxjs';


export abstract class BaseComponent implements OnInit {

  authUser: any;
  auth$: Observable<any>;

  constructor(public api: ApiService,
              public notificationService: NotificationService,
              public translate: TranslateService,
              public dialog: DialogService,
              public store: Store<AppState>
              ) {
    this.auth$ = this.store.pipe(select(selectAuth));
    this.auth$.subscribe(data => {
      this.authUser = data.user;
    })
  }

  ngOnInit() {
  }

}
