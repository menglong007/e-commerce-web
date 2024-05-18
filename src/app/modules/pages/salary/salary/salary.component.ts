import {AfterViewInit, Component, Injector, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {MatSort, MatSortModule} from "@angular/material/sort";
import {MatDialog} from "@angular/material/dialog";
import {SalaryFormComponent} from "../salary-form/salary-form.component";
import {HttpClient} from "@angular/common/http";
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";
import {take} from "rxjs";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {CommonModule} from "@angular/common";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatNativeDateModule} from "@angular/material/core";
import {RouterLink} from "@angular/router";


@Component({
  selector: 'app-create-product',
  templateUrl: './salary.component.html',
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    RouterLink,
  ],
  standalone: true,

})
export class SalaryComponent implements OnInit , AfterViewInit{

  displayedColumns: string[] = [
    'no',
    'staffId',
    'amount',
    'subjectId',
    'status',
    'action',
  ];
  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private  dialog: MatDialog,
              private http: HttpClient,
              private snackBar:MatSnackBar) {
  }

  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(){
    this.loadData();
  }

  private loadData(){
    this.http.get('http://127.0.0.1:8000/api/salary').subscribe({
      next:(res: any)=>{
        this.dataSource.data = res.data
      }
    })
  }
  onRemove(id: string){
    const ref = this.snackBar.open('Are you sure you want to delete this item?','Ok',{
      duration : 3000,
      verticalPosition :'top'
    });
    ref.onAction().pipe(take(1)).subscribe({
      next : value => {
        this.onDelete(id)
      }
    })
  }

  onDelete(id : string){
    const ref= this.snackBar.open('loading...');
    this.http.delete(`http://127.0.0.1:8000/api/salary/delete/${id}`).subscribe({
      complete :()=>{
        ref.dismiss();
        this.loadData();
      },
    })

  }

}