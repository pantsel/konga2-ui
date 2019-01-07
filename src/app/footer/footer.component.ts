import {Component, OnInit} from '@angular/core';
import {BaseComponent} from '@app/core/base/base.component';
import {ApiService} from '@app/core/api/api.service';
import {AppState, NotificationService} from '@app/core';
import {TranslateService} from '@ngx-translate/core';
import {DialogService} from '@app/core/dialog/dialog.service';
import {Store} from '@ngrx/store';

@Component({
  selector: 'anms-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent extends BaseComponent implements OnInit {


  constructor(
    public api: ApiService,
    public notificationService: NotificationService,
    public translate: TranslateService,
    public dialog: DialogService,
    public store: Store<AppState>) {
    super(api, notificationService, translate, dialog, store);



  }

  ngOnInit() {
    super.ngOnInit();
  }




}
