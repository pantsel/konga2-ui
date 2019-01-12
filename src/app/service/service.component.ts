import {Component, Injectable, OnInit} from '@angular/core';
import {KongApiService} from '@app/core/api/kong-api.service';
import {TranslateService} from '@ngx-translate/core';
import {DialogService} from '@app/core/dialog/dialog.service';
import {AppState, NotificationService} from '@app/core';
import {Store} from '@ngrx/store';
import {ServicesCreateComponent} from '@app/services/services-create/services-create.component';
import {KongBaseComponent} from '@app/core/kong-base/kong-base.component';
import {ActivatedRoute} from '@angular/router';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {
  data: BehaviorSubject<any> = <BehaviorSubject<any>>new BehaviorSubject(null);
  constructor() { }
}

@Component({
  selector: 'anms-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent extends KongBaseComponent implements OnInit {

  public id: any;
  public service: any;

  constructor(private route: ActivatedRoute,
              private shared: SharedServiceService,
              public kong: KongApiService,
              public translate: TranslateService,
              public dialog: DialogService,
              public notificationsService: NotificationService,
              public store: Store<AppState>) {
    super(kong, notificationsService, translate, dialog, store)

    this.route.params.subscribe(params => {
      this.id = params.id
      this.fetchService();
    });

    shared.data.subscribe(data => {
      if (data) {
        this.service = data;
      }
    })

  }

  ngOnInit() {
    super.ngOnInit();
  }

  fetchService() {
    this.shared.data.next(null); // Reset the user
    this.kong.get(`services/${this.id}`)
      .subscribe(data => {
        console.log('fetchService =>', data);
        this.shared.data.next(data);
      })
  }


}


