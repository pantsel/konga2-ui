import {Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter} from '@angular/core';
import * as _ from 'lodash';
import {ApiService} from '@app/core/api/api.service';
import {PageEvent} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {debounceTime, switchMap, tap} from 'rxjs/operators';
import {TranslateService} from '@ngx-translate/core';
import {DialogService} from '@app/core/dialog/dialog.service';
import {ListConfigService} from '@app/core/list-config/list-config.service';
import {AppState, NotificationService, selectAuth} from '@app/core';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';

@Component({
  selector: 'anms-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataTableComponent implements OnInit {

  form: FormGroup;

  @Input() data = {
    totalCount: 0,
    results: []
  };
  @Input() titleItems = [];
  @Input() limit = 30;
  @Input() page = 0;
  @Input() sortAttr = 'createdAt';
  @Input() sortDir = 'DESC';
  @Input() pageSizeOptions = [5, 10, 25, 100]
  @Input() endpoint: string;
  @Input() model: string;

  @Output() searchTerm: EventEmitter<any> = new EventEmitter();

  isLoading: boolean;
  searchableTitleItems = [];

  authUser: any;
  auth$: Observable<any>;

  constructor(public api: ApiService,
              public translate: TranslateService,
              public dialog: DialogService,
              public notificationsService: NotificationService,
              public store: Store<AppState>,
              public listConfig: ListConfigService,
              public fb: FormBuilder) {

    this.auth$ = this.store.pipe(select(selectAuth));
    this.auth$.subscribe(data => {
      this.authUser = data.user;
    })
  }

  ngOnInit() {

    const config = _.get(this.listConfig, `models.${this.model}`);
    this.endpoint = config.endpoint;
    this.titleItems = config.titleItems;

    this.form = this.fb.group({
      term: ['']
    });

    this.form
      .get('term')
      .valueChanges
      .pipe(
        debounceTime(500),
        tap(() => this.isLoading = true),
        switchMap(value => {
          return this.loadData();
        }))
      .subscribe(users => {

      });

    this.loadData().then();
  }

  getValue(obj, path) {
    return _.get(obj, path, 'N/A');
  }

  getSearchableTitleItemsTitles() {
    return _.map(this.searchableTitleItems, item => this.translate.instant(item.title).toLocaleLowerCase());
  }


  async loadData() {
    try {
      const skip = this.limit * this.page;
      const where = {
        or: []
      };

      this.searchableTitleItems = _.filter(this.titleItems, item => item.searchable);
      console.log('inSearch =>', this.getSearchableTitleItemsTitles());
      this.searchableTitleItems.forEach(item => {
        const obj = {};
        obj[item.property] = {
          contains: this.form.get('term').value
        }
        where.or.push(obj)
      })

      const res: any = await this.api.get(this.endpoint, {
        sort: `${this.sortAttr} ${this.sortDir}`,
        limit: this.limit,
        where: JSON.stringify(where),
        skip: skip
      }).toPromise();
      this.data = res;
      this.isLoading = false;
      console.log('[DataTableComponent]: loadData =>', this.data)
    } catch (e) {
      this.isLoading = false;
      throw e;
    }
  }

  onPageChange($event: PageEvent) {
    console.log('Page change =>', $event);
    this.page = $event.pageIndex;

    // If limit has changed, go back to page 1
    if (this.limit !== $event.pageSize) {
      this.page = 0;
    }
    this.limit = $event.pageSize;
    this.loadData();
  }

  sort(attr) {
    const sortDesc = this.sortAttr === attr ? this.sortDir === 'ASC' : true;
    this.sortDir = sortDesc ? 'DESC' : 'ASC';
    this.sortAttr = attr;
    this.loadData();
  }

  onDeleteItem(item) {
    const title = this.translate.instant('konga.delete_item_title');
    const text = this.translate.instant('konga.delete_item_text');
    this.dialog.confirm(title, text)
      .then(confirm => {
        if (confirm) {
          this.deleteItem(item);
        }
      });
  }

  deleteItem(item) {
    this.api.delete(`${this.endpoint}/${item.id}`)
      .subscribe(deleted => {
        console.log('Item deleted =>', deleted);
        this.notificationsService.success(this.translate.instant('konga.delete_item_success'))
        this.loadData();
      })
  }

}
