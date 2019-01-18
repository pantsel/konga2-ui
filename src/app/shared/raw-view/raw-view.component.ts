import {Component, OnInit, ChangeDetectionStrategy, Input, Inject, ViewChild, ElementRef} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';

@Component({
  selector: 'dialog-overview-example-dialog',
  template: `
      <div class="row mb-2 align-items-center">
          <div class="col-md-6">
              <h2 class="m-0">{{'konga.inspect' | translate}}</h2>
          </div>
          <div class="col-md-6 text-right">
              <button mat-icon-button [mat-dialog-close]="data" style="margin-top: -5px">
                  <mat-icon>close</mat-icon>
              </button>
          </div>
      </div>
      <div mat-dialog-content #data></div>
  `,
})
export class InspectionDialog implements OnInit{

  @ViewChild('data') dataContainer: ElementRef;

  constructor(
    public dialogRef: MatDialogRef<InspectionDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

  }

  ngOnInit(): void {
    const html = window['JsonHuman'].format(this.data);
    this.dataContainer.nativeElement.appendChild(html);
  }

}

@Component({
  selector: 'anms-raw-view',
  templateUrl: './raw-view.component.html',
  styleUrls: ['./raw-view.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RawViewComponent implements OnInit {

  @Input() data;

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  openInspectModal() {
    const dialogRef = this.dialog.open(InspectionDialog, {
      width: '560px',
      data: this.data
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
