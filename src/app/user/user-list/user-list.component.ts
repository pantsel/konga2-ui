import { Component, OnInit } from '@angular/core';
import {ApiService} from '@app/core/api/api.service';
import {ListConfigService} from '@app/core/list-config/list-config.service';
import * as _ from 'lodash';

@Component({
  selector: 'anms-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  data: any = {
    totalCount: 0,
    results: []
  };
  titleItems = [];

  constructor(private api: ApiService,
              public listConfig: ListConfigService) {

  }

  ngOnInit() {
    this.titleItems = _.get(this.listConfig, 'models.user');
    this.loadData().then();
  }

  async loadData() {
    this.data = await  this.api.get(`users`, {
      sort: 'createdAt DESC'
    }).toPromise();
    console.log('[UserListComponent]: loadData =>', this.data)
  }

}
