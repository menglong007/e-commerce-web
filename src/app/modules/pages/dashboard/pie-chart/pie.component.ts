import {Component, OnInit} from '@angular/core';
import {NgxChartsModule} from "@swimlane/ngx-charts";
import {HttpClient} from "@angular/common/http";
@Component({
  selector: 'pie-chart',
  templateUrl: 'pie.component.html',
  imports: [
    NgxChartsModule
  ],
  standalone: true
})

export class PieComponent implements OnInit {

  single: any[] = [];

  colorScheme: any = {
    domain: [ '#C7B42C', '#A10A28']
  };

  constructor(private http : HttpClient) {
  }
  ngOnInit(){
    this.loadData();
  }

  private loadData(){
    this.http.get('http://127.0.0.1:8000/api/pie').subscribe({
      next:(value: any) =>{
        this.single = value;
      }
    })
  }

}
