import {Component, OnInit, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'anms-kong-entity-modal',
  templateUrl: './kong-entity-modal.component.html',
  styleUrls: ['./kong-entity-modal.component.css']
})
export class KongEntityModalComponent implements OnInit {

  entity: any;
  existingData: any;
  extras: any;
  isModal: boolean;

  // The context from which we trigger this component.
  // Can be `consumer`, `service`, `route` or undefined (global)
  context: string;

  constructor(private dialogRef: MatDialogRef<KongEntityModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {

    this.entity = data.entity;
    this.existingData = data.existingData;
    this.extras = data.extras;
    this.isModal = data.isModal;
    this.context = data.context;

  }

  ngOnInit() {
  }


  close(data?) {
    this.dialogRef.close(data);
  }

}
