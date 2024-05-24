import {Component, OnInit} from '@angular/core';
import {NgxChartsModule} from "@swimlane/ngx-charts";
import {HttpClient} from "@angular/common/http";
@Component({
  selector: 'bar-chart',
  templateUrl: 'bar-chart.component.html',
  imports: [
    NgxChartsModule
  ],
  standalone: true
})

export class BarChartComponent implements OnInit{

  single: any;

  showDataLabel : boolean =  true;
  constructor(private http : HttpClient) {
  }
  ngOnInit(){
    this.loadData();
  }

  private loadData(){
    this.http.get('http://127.0.0.1:8000/api/bar').subscribe({
      next:(value: any) =>{
        this.single = value;
      }
    })
  }


  colorScheme: any = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };


}
