import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {KongService} from '@app/core/entities/kong-service';


@Component({
  selector: 'anms-service-create',
  templateUrl: './service-create.component.html',
  styleUrls: ['./service-create.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ServiceCreateComponent implements OnInit {

  entity = KongService;

  constructor(private dialogRef: MatDialogRef<ServiceCreateComponent>) {

  }

  ngOnInit() {

  }

  close(data?) {
    this.dialogRef.close(data);
  }

}
