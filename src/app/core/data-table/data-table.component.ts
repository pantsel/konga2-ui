import {Component, OnInit, ChangeDetectionStrategy, Input} from '@angular/core';
import * as _ from 'lodash';
import {ApiService} from '@app/core/api/api.service';

@Component({
  selector: 'anms-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataTableComponent implements OnInit {

  @Input() data = {
    totalCount: 0,
    results: []
  };
  @Input() titleItems = [];

  constructor(public api: ApiService) { }

  ngOnInit() {
    this.loadData().then();
  }

  getValue(obj, path) {
    return _.get(obj, path, 'N/A');
  }

  async loadData() {
    const res: any = await  this.api.get(`users`, {
      sort: 'createdAt DESC'
    }).toPromise();
    this.data = res;
    console.log('[DataTableComponent]: loadData =>', this.data)
  }

}
