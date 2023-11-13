import {AfterViewInit, Component} from '@angular/core';
import { MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatDialog} from "@angular/material/dialog";
import {FormComponent} from "./form.component/form.component";

@Component({
  selector: 'app-user',
  templateUrl: 'user.component.html',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatButtonModule, MatIconModule],
})
export class UserComponent implements AfterViewInit {
  displayedColumns  : string[] = ['no', 'photo', 'firstname', 'lastname','phone','position', 'organization', 'address'];
  dataSource = new MatTableDataSource<any>();


  ngAfterViewInit() {
  }
  constructor(public dialog: MatDialog) {}

  openDialog() {
    const dialogRef = this.dialog.open(FormComponent,{
      height:'600px',
      width : '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }


  onAdd(){

  }
}



