import { Component, OnInit, Input } from '@angular/core';
import { SKYEvent } from '../../shares/models/event.model';
import { Category } from '../../shares/models/category.model';

@Component({
  selector: 'sky-history-events',
  templateUrl: './history-events.component.html',
  styleUrls: ['./history-events.component.css']
})
export class HistoryEventsComponent implements OnInit {

  @Input() categories: Category[] = [];
  @Input() events: SKYEvent[] = [];
  searchValue = '';
  searchPlaceholder = 'Сумма';
  searchField = 'amount';

  constructor() { }

  ngOnInit() {
    this.events.forEach((event) => {
      event.catName = this.categories.find((cat) => {
        return cat.id === event.category
      }).name;
    });
  }

  getEventClass(event: SKYEvent){
    return {
      'label': true,
      'label-danger': event.type === "outcome",
      'label-success': event.type === "income"
    }
  }

  changeCriteria(field: string){
    const namesMap = {
      amount: 'Сумма',
      date: 'Дата',
      category: 'Категория',
      type: 'Тип'
    };
    this.searchPlaceholder = namesMap[field];
    this.searchField = field;
  }

}
