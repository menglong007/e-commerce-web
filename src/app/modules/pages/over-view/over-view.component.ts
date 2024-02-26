import {Component, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'app-over-view',
  templateUrl: './over-view.component.html',
})
export class OverViewComponent {

  displayedColumns: string[] = [
    'no',
    'fullname',
    'phone',
    'location',
    'online',
    'pickUp',
    'inActive',
    'action',
  ];
  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  onRemove(){

  }

}
