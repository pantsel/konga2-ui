import {Component, OnInit} from '@angular/core';
import {KongApiService} from '@app/core/api/kong-api.service';
import {TranslateService} from '@ngx-translate/core';
import {DialogService} from '@app/core/dialog/dialog.service';
import {AppState, NotificationService} from '@app/core';
import {Store} from '@ngrx/store';
import {ServicesCreateComponent} from '@app/services/services-create/services-create.component';
import {KongBaseComponent} from '@app/core/kong-base/kong-base.component';

@Component({
  selector: 'anms-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent extends KongBaseComponent implements OnInit {

  constructor(public kong: KongApiService,
              public translate: TranslateService,
              public dialog: DialogService,
              public notificationsService: NotificationService,
              public store: Store<AppState>) {
    super(kong, notificationsService, translate, dialog, store)

  }


}


