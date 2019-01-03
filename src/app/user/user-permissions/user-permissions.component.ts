import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'anms-user-permissions',
  templateUrl: './user-permissions.component.html',
  styleUrls: ['./user-permissions.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserPermissionsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
