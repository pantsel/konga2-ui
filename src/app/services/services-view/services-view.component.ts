import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'anms-services-view',
  templateUrl: './services-view.component.html',
  styleUrls: ['./services-view.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ServicesViewComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
