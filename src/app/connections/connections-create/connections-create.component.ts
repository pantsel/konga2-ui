import {Component, OnInit, ChangeDetectionStrategy, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {TranslateService} from '@ngx-translate/core';
import {ApiService} from '@app/core/api/api.service';
import {NotificationService} from '@app/core';

@Component({
  selector: 'anms-connections-create',
  templateUrl: './connections-create.component.html',
  styleUrls: ['./connections-create.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConnectionsCreateComponent implements OnInit {

  existingConnection: any;

  constructor(public dialogRef: MatDialogRef<ConnectionsCreateComponent>,
              public translate: TranslateService,
              public api: ApiService,
              private notificationService: NotificationService,
              @Inject(MAT_DIALOG_DATA) public data: any) {

    this.existingConnection = this.data.connection;
    console.log('[ConnectionsCreateComponent]: existingConnection =>', this.existingConnection);
  }

  ngOnInit() {

  }



  created(data) {
    this.dialogRef.close(data);
  }

  updated(data) {
    this.dialogRef.close(data);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
