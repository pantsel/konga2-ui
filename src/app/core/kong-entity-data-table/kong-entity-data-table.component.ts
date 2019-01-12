import {OnInit, Input, Output, EventEmitter} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {DialogService} from '@app/core/dialog/dialog.service';
import {AppState, NotificationService} from '@app/core';
import {Store} from '@ngrx/store';
import {KongApiService} from '@app/core/api/kong-api.service';
import * as _ from 'lodash';
import {debounceTime, tap} from 'rxjs/operators';
import {PageEvent} from '@angular/material';
import {KongBaseComponent} from '@app/core/kong-base/kong-base.component';
import {Component} from '@angular/core';
import {ConnectionsService} from '@app/connections/connections.service';
import {Entities} from '@app/core/entities/entities';

@Component({
  selector: 'anms-kong-entity-data-table',
  templateUrl: './kong-entity-data-table.component.html',
  styleUrls: ['./kong-entity-data-table.component.css']
})
export class KongEntityDataTableComponent extends KongBaseComponent implements OnInit {

  form: FormGroup;
  originalData: any;

  @Input() data: any;
  @Input() titleItems = [];
  @Input() limit = 25;
  @Input() page = 0;
  @Input() sortAttr = 'created_at';
  @Input() sortDir = 'desc';
  @Input() pageSizeOptions = [5, 10, 25, 100]
  @Input() endpoint: string;
  @Input() entity: any;

  @Output() searchTerm: EventEmitter<any> = new EventEmitter();

  isLoading: boolean;
  isInitialLoad: boolean;
  searchableTitleItems = [];

  constructor(public api: KongApiService,
              public translate: TranslateService,
              public dialog: DialogService,
              public notificationsService: NotificationService,
              public store: Store<AppState>,
              public connectionsService: ConnectionsService,
              public fb: FormBuilder) {
    super(api, notificationsService, translate, dialog, store)

  }

  ngOnInit() {

    super.ngOnInit();

    this.endpoint = this.entity.endpoint;
    this.titleItems = this.entity.titleItems;
    this.searchableTitleItems = _.filter(this.titleItems, item => item.searchable);

    this.connectionsService.activeNodeChanged$.subscribe(data => {
      this.loadData();
    })

    this.form = this.fb.group({
      term: ['']
    });

    this.form
      .get('term')
      .valueChanges
      .pipe(
        debounceTime(500),
        tap(() => this.isLoading = true))
      .subscribe((q: string) => {
        this.data = _.filter(this.originalData, item => {
          return this.getSearchableTitleItemsProps().some(prop => {
            return item[prop] && item[prop].toLowerCase().indexOf(q.toLowerCase().trim()) > -1
          })
        })

        this.isLoading = false;
      });
  }

  getValue(obj, path) {
    return _.get(obj, path, 'N/A');
  }

  getSearchableTitleItemsProps() {
    return _.map(this.searchableTitleItems, item => item.property);
  }

  getSearchableTitleItemsTitles() {
    return _.map(this.searchableTitleItems, item => this.translate.instant(item.title).toLocaleLowerCase());
  }


  async loadData() {

    // await this.sleep(5000);

    // this.data = null;

    try {

      const res: any = await this.api.get(this.endpoint).toPromise();
      this.isInitialLoad = !this.data ? true : false; // Initial load
      this.originalData = res;
      this.data = this.paginate(_.orderBy(this.originalData, [this.sortAttr], [this.sortDir]), this.limit, this.page);
      this.isLoading = false;


      console.log('[KongEntityDataTableComponent]: loadData =>', this.data)
    } catch (e) {
      this.isLoading = false;
      throw e;
    }
  }

  paginate (array, size, page) {
    return array.slice(page * size, (page + 1) * size);
  }

  onPageChange($event: PageEvent) {
    console.log('Page change =>', $event);
    this.page = $event.pageIndex;

    // If limit has changed, go back to page 1
    if (this.limit !== $event.pageSize) {
      this.page = 0;
    }
    this.limit = $event.pageSize;

    this.data = this.paginate(this.originalData, this.limit, this.page);
  }

  sort(attr) {
    const sortDesc = this.sortAttr === attr ? this.sortDir === 'asc' : true;
    this.sortDir = sortDesc ? 'desc' : 'asc';
    this.sortAttr = attr;
    this.data = this.paginate(_.orderBy(this.originalData, [this.sortAttr], [this.sortDir]), this.limit, this.page);

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
