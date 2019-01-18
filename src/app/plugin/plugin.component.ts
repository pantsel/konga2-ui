import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'anms-plugin',
  templateUrl: './plugin.component.html',
  styleUrls: ['./plugin.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PluginComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
