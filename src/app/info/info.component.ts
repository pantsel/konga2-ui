import {Component, OnInit, ChangeDetectionStrategy, ViewChild, ElementRef, Renderer} from '@angular/core';
import {ApiService} from '@app/core/api/api.service';
import {KongApiService} from '@app/core/api/kong-api.service';
import {AppState, NotificationService} from '@app/core';
import {TranslateService} from '@ngx-translate/core';
import {DialogService} from '@app/core/dialog/dialog.service';
import {Store} from '@ngrx/store';
import {ConnectionsService} from '@app/connections/connections.service';
import {BaseComponent} from '@app/core/base/base.component';

@Component({
  selector: 'anms-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent  extends BaseComponent implements OnInit {

  @ViewChild('info') infoContainer: ElementRef;

  info: any;
  infoTable: any;

  constructor(public api: ApiService,
              public kong: KongApiService,
              public notificationService: NotificationService,
              public translate: TranslateService,
              public dialog: DialogService,
              public store: Store<AppState>,
              public connectionsService: ConnectionsService) {
    super(api, notificationService, translate, dialog, store);

    this.connectionsService.activeNodeInfoChanged$.subscribe(info => {
      console.log('[InfoComponent]: connectionsService.activeNodeInfoChanged$ =>', info);
      if (info) {
        this.info = info;
        this.infoTable = window['JsonHuman'].format(info);
        if (this.infoContainer.nativeElement.childNodes[0]) {
          this.infoContainer.nativeElement.removeChild(this.infoContainer.nativeElement.childNodes[0])
        }
        this.infoContainer.nativeElement.appendChild(this.infoTable);
      }
    })
  }

  ngOnInit() {
  }

}
