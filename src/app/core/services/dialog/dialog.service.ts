import { Injectable } from '@angular/core';
import {
  MatDialogRef,
  MatDialog,
  MatDialogConfig,
} from '@angular/material/dialog';
import { AlertComponent } from './alert/alert.component';
import { ConfirmComponent } from './confirm/confirm.component';

@Injectable()
export class DialogService {
  constructor(public dialog: MatDialog) {}
  alert(message: string): void {
    const config = {
      data: message,
      minWidth: '300px',
      height: 'auto',
    } as MatDialogConfig;
    this.dialog.open(AlertComponent, config);
  }

  confirm(message: string): MatDialogRef<ConfirmComponent, any> {
    const config = {
      data: message,
      minWidth: '300px',
      height: 'auto',
      disableClose: true,
    } as MatDialogConfig;
    return this.dialog.open(ConfirmComponent, config);
  }
}
