import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {KongService} from '@app/core/entities/kong-service';
import {SharedServiceService} from '@app/service/service.component';

@Component({
  selector: 'anms-service-details',
  templateUrl: './service-details.component.html',
  styleUrls: ['./service-details.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ServiceDetailsComponent implements OnInit {

  entity = KongService;
  service: any;

  constructor(private shared: SharedServiceService) {
    shared.data.subscribe(data => {
      this.service = data;
    })
  }

  ngOnInit() {
  }


  updated(data) {
    this.shared.data.next(data);
  }

}
