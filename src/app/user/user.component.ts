import { Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ApiService} from '@app/core/api/api.service';
import {AppState, NotificationService, selectAuth} from '@app/core';
import {TranslateService} from '@ngx-translate/core';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {SharedUserService} from '@app/user/shared-user.service';
import {BaseComponent} from '@app/core/base/base.component';
import {DialogService} from '@app/core/dialog/dialog.service';

@Component({
  selector: 'anms-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent extends BaseComponent implements OnInit {
  private sub: any;
  public id: any;
  public user: any;


  constructor(private route: ActivatedRoute,
              public translate: TranslateService,
              public notificationService: NotificationService,
              public dialog: DialogService,
              private sharedUserService: SharedUserService,
              public store: Store<AppState>,
              public api: ApiService) {

    super(api, notificationService, translate, dialog, store);

    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      this.fetchUser();
    });

    sharedUserService._user.subscribe(user => {
      if (user) {
        this.user = user;
      }
    })
  }

  ngOnInit() {
    super.ngOnInit();
  }

  fetchUser() {
    this.sharedUserService._user.next(null); // Reset the user
    this.api.get(`users/${this.id}`)
      .subscribe(data => {
        console.log('fetchUser =>', data);
        this.sharedUserService._user.next(data);
      })
  }

}
