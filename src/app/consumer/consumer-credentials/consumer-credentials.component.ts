import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {SharedConsumerService} from '@app/consumer/consumer.component';

@Component({
  selector: 'anms-consumer-credentials',
  templateUrl: './consumer-credentials.component.html',
  styleUrls: ['./consumer-credentials.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConsumerCredentialsComponent implements OnInit {

  consumer: any;
  navLinks: Array<any>;
  selectedIndex = 0;

  constructor(shared: SharedConsumerService) {
    shared.data.subscribe(data => {
      this.consumer = data;
    })
  }

  ngOnInit() {
    this.createNavLinks();
  }


  createNavLinks() {
    if (!this.consumer) return false;
    this.navLinks = [
      {
        label: 'Basic Auth',
        icon: 'supervised_user_circle',
        path: [{ outlets: { credentials: ['basic-auth'] } }]
      },
      {
        label: 'Key Auth',
        icon: 'vpn_key',
        path: [{ outlets: { credentials: ['key-auth'] } }]
      },
      {
        label: 'HMAC Auth',
        icon: 'code',
        path: [{ outlets: { credentials: ['hmac-auth'] } }]
      },
      {
        label: 'Oauth2',
        icon: 'security',
        path: [{ outlets: { credentials: ['oauth2'] } }]
      },
      {
        label: 'JWT',
        icon: 'fingerprint',
        path: [{ outlets: { credentials: ['jwt'] } }]
      }
    ]
  }

}
