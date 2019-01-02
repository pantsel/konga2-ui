import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ApiService} from '@app/core/api/api.service';
import {ListConfigService} from '@app/core/list-config/list-config.service';
import * as _ from 'lodash';
import {MatPaginator, MatSort} from '@angular/material';
import {merge, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import {DataTableComponent} from '@app/core/data-table/data-table.component';
import {FormBuilder} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'anms-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent extends DataTableComponent implements OnInit {


  constructor(public api: ApiService,
              public fb: FormBuilder,
              public translate: TranslateService,
              public listConfig: ListConfigService) {

    super(api, translate, fb);
    this.titleItems = _.get(this.listConfig, 'models.user');
  }

  ngOnInit() {

    super.ngOnInit();
  }

}
