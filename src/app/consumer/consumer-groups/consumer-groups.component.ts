import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'anms-consumer-groups',
  templateUrl: './consumer-groups.component.html',
  styleUrls: ['./consumer-groups.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConsumerGroupsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
