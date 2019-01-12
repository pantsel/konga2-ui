import { Component, OnInit } from '@angular/core';
import {SharedConsumerService} from '@app/consumer/consumer.component';
import {KongConsumer} from '@app/core/entities/kong-consumer';

@Component({
  selector: 'anms-consumer-details',
  templateUrl: './consumer-details.component.html',
  styleUrls: ['./consumer-details.component.css']
})
export class ConsumerDetailsComponent implements OnInit {

  entity = KongConsumer;
  data: any;

  constructor(private shared: SharedConsumerService) {
    shared.data.subscribe(data => {
      this.data = data;
    })
  }

  ngOnInit() {
  }

  updated(data) {
    this.shared.data.next(data);
  }

}
