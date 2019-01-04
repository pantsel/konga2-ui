import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'anms-page-loader',
  templateUrl: './page-loader.component.html',
  styleUrls: ['./page-loader.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageLoaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
