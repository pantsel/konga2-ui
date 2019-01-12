import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {SharedRouteService} from '@app/route/route.component';
import {KongRoute} from '@app/core/entities/kong-route';
import * as _ from 'lodash';

@Component({
  selector: 'anms-route-details',
  templateUrl: './route-details.component.html',
  styleUrls: ['./route-details.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RouteDetailsComponent implements OnInit {

  entity = KongRoute;
  data: any;
  extras: any;

  constructor(private shared: SharedRouteService) {
    shared.data.subscribe(data => {
      this.data = data;
      this.extras = {
        service: _.get(this.data, 'service')
      }
    })
  }

  ngOnInit() {
  }

  updated(data) {
    this.shared.data.next(data);
  }

}
