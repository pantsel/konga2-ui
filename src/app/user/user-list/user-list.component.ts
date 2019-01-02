import {Component, OnInit, ViewChild} from '@angular/core';
import {ApiService} from '@app/core/api/api.service';
import {ListConfigService} from '@app/core/list-config/list-config.service';
import * as _ from 'lodash';
import {MatPaginator, MatSort} from '@angular/material';
import {merge, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';

@Component({
  selector: 'anms-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  // data: any = {
  //   totalCount: 0,
  //   results: []
  // };
  // titleItems = [];

  displayedColumns: string[] = [];
  exampleDatabase: null;
  data = [];

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private api: ApiService,
              public listConfig: ListConfigService) {

    this.displayedColumns = _.map(_.get(this.listConfig, 'models.user'), (item: any) => item.title);

  }

  ngOnInit() {
    // this.titleItems = _.get(this.listConfig, 'models.user');
    // this.loadData().then();

    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.api.get(`users`, {
            sort: `${this.sort.active} ${this.sort.direction}`,
            // skip : this.paginator.pageIndex
          });
        }),
        map(data => {
          // Flip flag to show that loading has finished.
          console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@", data);
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
          this.resultsLength = data.totalCount;

          return data.reslts;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          // Catch if the GitHub API has reached its rate limit. Return empty data.
          this.isRateLimitReached = true;
          return observableOf([]);
        })
      ).subscribe(data => this.data = data);
  }

  // async loadData() {
  //   this.data = await  this.api.get(`users`, {
  //     sort: 'createdAt DESC'
  //   }).toPromise();
  //   console.log('[UserListComponent]: loadData =>', this.data)
  // }

}
