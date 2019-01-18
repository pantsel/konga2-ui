import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'anms-plugin-list',
  templateUrl: './plugin-list.component.html',
  styleUrls: ['./plugin-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PluginListComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
