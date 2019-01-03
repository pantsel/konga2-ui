import { Injectable } from '@angular/core';
import {MatDialog} from '@angular/material';
import {DialogComponent} from '@app/core/dialog/dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(public dialog: MatDialog) { }

  warning(message, cb) {
    return this.alert('warning', '', message, cb);
  }

  danger(message, cb) {
    return this.alert('danger', '', message, cb);
  }

  success(message, cb) {
    return this.alert('success', '', message, cb);
  }

  alert(type, title, message, cb) {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '320px',
      autoFocus: true,
      disableClose: true,
      data: {
        title: title,
        message: message,
        type: type}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      cb();
    });
  }

  confirm(title, message) {

    return new Promise((resolve) => {
      const dialogRef = this.dialog.open(DialogComponent, {
        width: '320px',
        autoFocus: true,
        disableClose: true,
        data: {
          title: title,
          message: message,
          type: 'confirm'}
      });

      dialogRef.afterClosed().subscribe(result => {
        resolve(result);
      });
    })

  }
}
