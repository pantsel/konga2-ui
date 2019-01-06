import { Injectable } from '@angular/core';
import {MatDialog} from '@angular/material';
import {DialogComponent} from '@app/core/dialog/dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(public dialog: MatDialog) { }

  async warning(message) {
    return await this.alert('warning', '', message);
  }

  async danger(message) {
    return await this.alert('danger', '', message);
  }

  async success(message) {
    return await this.alert('success', '', message);
  }

  alert(type, title, message) {
    return new Promise((resolve) => {
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
        resolve();
      });
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
