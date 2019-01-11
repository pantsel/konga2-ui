import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {MatDialogRef} from '@angular/material';


@Component({
  selector: 'anms-services-create',
  templateUrl: './services-create.component.html',
  styleUrls: ['./services-create.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ServicesCreateComponent implements OnInit {


  constructor(private dialogRef: MatDialogRef<ServicesCreateComponent>) {

  }

  ngOnInit() {

  }

  close(data?) {
    this.dialogRef.close(data);
  }

}
