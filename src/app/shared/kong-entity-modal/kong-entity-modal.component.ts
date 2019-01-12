import {Component, OnInit, ChangeDetectionStrategy, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'anms-kong-entity-modal',
  templateUrl: './kong-entity-modal.component.html',
  styleUrls: ['./kong-entity-modal.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KongEntityModalComponent implements OnInit {

  entity: any;
  existingData: any;

  constructor(private dialogRef: MatDialogRef<KongEntityModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {

    this.entity = data.entity;
    this.existingData = data.existingData;

  }

  ngOnInit() {
  }


  close(data?) {
    this.dialogRef.close(data);
  }

}
