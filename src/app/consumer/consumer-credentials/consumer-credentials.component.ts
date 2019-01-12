import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'anms-consumer-credentials',
  templateUrl: './consumer-credentials.component.html',
  styleUrls: ['./consumer-credentials.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConsumerCredentialsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
