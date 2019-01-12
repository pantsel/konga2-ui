import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {Service} from '@app/core/entities/Service';


@Component({
  selector: 'anms-services-create',
  templateUrl: './services-create.component.html',
  styleUrls: ['./services-create.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ServicesCreateComponent implements OnInit {

  entity = Service;

  constructor(private dialogRef: MatDialogRef<ServicesCreateComponent>) {

  }

  ngOnInit() {

  }

  close(data?) {
    this.dialogRef.close(data);
  }

}
