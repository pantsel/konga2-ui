import {Component, OnInit, Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {KongApiService} from '@app/core/api/kong-api.service';
import {TranslateService} from '@ngx-translate/core';
import {DialogService} from '@app/core/dialog/dialog.service';
import {AppState, NotificationService} from '@app/core';
import {Store} from '@ngrx/store';
import {KongBaseComponent} from '@app/core/kong-base/kong-base.component';

@Injectable({
  providedIn: 'root'
})
export class SharedConsumerService {
  data: BehaviorSubject<any> = <BehaviorSubject<any>>new BehaviorSubject(null);
  constructor() { }
}

@Component({
  selector: 'anms-consumer',
  templateUrl: './consumer.component.html',
  styleUrls: ['./consumer.component.css']
})
export class ConsumerComponent extends KongBaseComponent implements OnInit {

  public id: any;
  public item: any;

  constructor(private route: ActivatedRoute,
              private shared: SharedConsumerService,
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
    this.kong.get(`consumers/${this.id}`)
      .subscribe(data => {
        console.log('fetchItem =>', data);
        this.shared.data.next(data);
      })
  }
}
