import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
import { WebsocketService } from 'src/app/services/websocket.service';

@Component({
  selector: 'app-grafica',
  templateUrl: './grafica.component.html',
  styleUrls: ['./grafica.component.css']
})
export class GraficaComponent implements OnInit {

  public lineChartData: ChartDataSets[] = [
    { data: [0, 0, 0, 0], label: 'Ventas' },
  ];
  public lineChartLabels: Label[] = ['January', 'February', 'March', 'April'];
  public lineChartLegend = true;
  public lineChartType: ChartType = 'line';

  constructor(private http: HttpClient, public wsService: WebsocketService) { }

  ngOnInit(): void {

    this.getData();
    this.escuchaSocket();
  }

  getData(): void {
    this.http.get('http://localhost:5000/grafica').subscribe((data: any) => {
      this.lineChartData = data;
    });
  }

  escuchaSocket(): void {
    this.wsService.listen('cambio-grafica')
      .subscribe((data: any) => {
        console.log(data);
        this.lineChartData = data;
      });
  }

}
