import { Component, Input } from '@angular/core';

@Component({
  selector: 'sky-history-chart',
  templateUrl: './history-chart.component.html',
  styleUrls: ['./history-chart.component.css']
})
export class HistoryChartComponent{

  @Input() data;

  constructor() { }

}
