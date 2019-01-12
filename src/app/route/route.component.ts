import {Component, Injectable, OnInit} from '@angular/core';
import {KongBaseComponent} from '@app/core/kong-base/kong-base.component';
import {ActivatedRoute} from '@angular/router';
import {KongApiService} from '@app/core/api/kong-api.service';
import {TranslateService} from '@ngx-translate/core';
import {DialogService} from '@app/core/dialog/dialog.service';
import {AppState, NotificationService} from '@app/core';
import {Store} from '@ngrx/store';
import {BehaviorSubject} from 'rxjs';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class SharedRouteService {
  data: BehaviorSubject<any> = <BehaviorSubject<any>>new BehaviorSubject(null);
  constructor() { }
}

@Component({
  selector: 'anms-route',
  templateUrl: './route.component.html',
  styleUrls: ['./route.component.css']
})
export class RouteComponent extends KongBaseComponent implements OnInit {

  public id: any;
  public item: any;
  public service: any;

  constructor(private route: ActivatedRoute,
              private shared: SharedRouteService,
              public kong: KongApiService,
              public translate: TranslateService,
              public dialog: DialogService,
              public notificationsService: NotificationService,
              public store: Store<AppState>) {
    super(kong, notificationsService, translate, dialog, store)

    this.route.params.subscribe(params => {
      this.id = params.id
      this.fetchItem();
    });

    shared.data.subscribe(data => {
      if (data) {
        this.item = data;
      }
    })
  }

  ngOnInit() {
    super.ngOnInit();
  }

  fetchItem() {
    this.shared.data.next(null); // Reset the user
    this.kong.get(`routes/${this.id}`)
      .subscribe(data => {
        console.log('fetchItem =>', data);
        this.shared.data.next(data);
        this.fetchService();
      })
  }

  fetchService() {
    this.kong.get(`services/${_.get(this.item, 'service.id')}`)
      .subscribe(data => {
        console.log('fetchService =>', data);
        this.service = data;
      })
  }
}
