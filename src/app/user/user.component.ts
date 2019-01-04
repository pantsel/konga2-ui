import { Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ApiService} from '@app/core/api/api.service';
import {AppState, selectAuth} from '@app/core';
import {TranslateService} from '@ngx-translate/core';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {SharedUserService} from '@app/user/shared-user.service';

@Component({
  selector: 'anms-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  private sub: any;
  public id: any;
  public user: any;

  auth$: Observable<any>;
  authUser: any;

  constructor(private route: ActivatedRoute,
              public translate: TranslateService,
              private sharedUserService: SharedUserService,
              public store: Store<AppState>,
              private api: ApiService) {

    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      this.fetchUser();
    });

    this.auth$ = this.store.pipe(select(selectAuth));
    this.auth$.subscribe(data => {
      this.authUser = data.user;
    })

    sharedUserService._user.subscribe(user => {
      if (user) {
        this.user = user;
      }
    })
  }

  ngOnInit() {
  }

  fetchUser() {
    this.sharedUserService._user.next(null); // Reset the user
    this.api.get(`users/${this.id}`)
      .subscribe(data => {
        this.sharedUserService._user.next(data);
      })
  }

}
