import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from "@angular/material/dialog";
import {FormComponent} from "./form.component/form.component";
import {MatMenuTrigger} from "@angular/material/menu";
import {ColumnEditableModel} from "./column-editable/column-editable.model";


@Component({
  selector: 'app-user',
  templateUrl: 'user.component.html',
})
export class UserComponent implements AfterViewInit {
  allColumn: string[] = ['no', 'photo', 'firstname', 'lastname', 'phone', 'position', 'organization', 'address'];
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatMenuTrigger) trigger!: MatMenuTrigger;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = [];

  columns: ColumnEditableModel[] = [
    {
      name: 'No',
      value: 'no',
      show: true,
    },
    {
      name: 'Photo',
      value: 'photo',
      show: true,
    },
    {
      name: 'Firstname',
      value: 'firstname',
      show: true,
    },
    {
      name: 'Lastname ',
      value: 'lastname',
      show: true,
    },
    {
      name: 'Phone',
      value: 'phone',
      show: true,
    },
    {
      name: 'Position',
      value: 'position',
      show: true,
    },
    {
      name: 'organization',
      value: 'organization',
      show: true,
    },
    {
      name: 'address ',
      value: 'address',
      show: true,
    }
  ]

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(public dialog: MatDialog) {
  }

  openDialog() {
    const dialogRef = this.dialog.open(FormComponent, {
      height: '600px',
      width: '600px'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  ngOnInit() {
    this._checkColumn();
  }

  private _checkColumn(): void {
    let newColumn: string[] = [];
    this.allColumn.forEach((e) => {
      const index = this.columns.findIndex((s) => s.value == e);
      if (index !== -1 && this.columns[index].show) {
        newColumn.push(e);
      }
    });
    newColumn.sort(
      (a, b) =>
        this.columns.findIndex((s) => s.value == a) - this.columns.findIndex((s) => s.value == b)
    );
    this.displayedColumns = newColumn;
  }


  onSave(columns: any[]): void {
    this.columns = columns;
    this._checkColumn();
    this.trigger.closeMenu();
  }

  getWidth(column: string) {
    const index = this.columns.findIndex(f => f.value == column);
    if (index < 0) return 'auto';
    if (this.columns[index].width == null) return 'auto';
    return `${this.columns[index].width}px`;
  }

}



