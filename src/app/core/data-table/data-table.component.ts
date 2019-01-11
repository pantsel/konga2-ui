import {Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter} from '@angular/core';
import * as _ from 'lodash';
import {ApiService} from '@app/core/api/api.service';
import {PageEvent} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {debounceTime, switchMap, tap} from 'rxjs/operators';
import {TranslateService} from '@ngx-translate/core';
import {DialogService} from '@app/core/dialog/dialog.service';
import {AppState, NotificationService} from '@app/core';
import {Store} from '@ngrx/store';
import {BaseComponent} from '@app/core/base/base.component';
import {Entities} from '@app/core/entities/entities';

@Component({
  selector: 'anms-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataTableComponent extends BaseComponent implements OnInit {

  form: FormGroup;

  @Input() data: any;
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
  isInitialLoad: boolean;
  searchableTitleItems = [];

  constructor(public api: ApiService,
              public translate: TranslateService,
              public dialog: DialogService,
              public notificationsService: NotificationService,
              public store: Store<AppState>,
              public entities: Entities,
              public fb: FormBuilder) {

    super(api, notificationsService, translate, dialog, store);
  }

  ngOnInit() {

    super.ngOnInit();

    const config = _.get(this.entities, `models.${this.model}`);
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

    // await this.sleep(5000);

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
      this.isInitialLoad = !this.data ? true : false; // Initial load
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

  /**
   * Utility function for testing
   * @param ms
   */
  private sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
