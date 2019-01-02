import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'anms-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserCreateComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
