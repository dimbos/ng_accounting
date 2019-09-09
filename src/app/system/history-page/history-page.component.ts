import { Component, OnInit, OnDestroy } from '@angular/core';
import { EventService } from '../shares/services/event.service';
import { CategoriesService  } from '../shares/services/categories.service';
import {Observable, combineLatest, Subscription} from 'rxjs';
import { SKYEvent } from '../shares/models/event.model';
import { Category } from '../shares/models/category.model';
import * as moment from 'moment';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.css']
})
export class HistoryPageComponent implements OnInit, OnDestroy {

  categories: Category[] = [];
  events: SKYEvent[] = [];
  filteredEvents: SKYEvent[] = [];
  isLoaded = false;
  chartData = [];
  subscription1: Subscription;
  isFilterVisible = false;


  constructor(private categoryService: CategoriesService,
    private eventsService: EventService,
    private title: Title       
  ) {
    title.setTitle('История');
   }

  ngOnInit() {
    this.subscription1 = combineLatest(
      this.categoryService.getCategories(),
      this.eventsService.getEvents()
    ).subscribe((data: [Category[], SKYEvent[]]) => {
      this.categories = data[0];
      this.events = data[1]
      this.setOriginalEvents();
      this.calculateChartData();
      this.isLoaded = true;
    })
  }

  private setOriginalEvents() {
    this.filteredEvents = this.events.slice();
  }

  calculateChartData(): void {
    this.chartData = [];

    this.categories.forEach((cat) => {
      const catEvent = this.filteredEvents.filter((e) => e.category === cat.id && e.type === 'outcome');
      this.chartData.push({
        name: cat.name,
        value: catEvent.reduce((total, e) => {
          total += e.amount;
          return total;
        }, 0)
      });
    });
  }

  private toggleFilterVisibility(dir: boolean) {
    this.isFilterVisible = dir;
  }

  openFilter() {
    this.toggleFilterVisibility(true);
  }

  onFilterApply(filterData) {
    this.toggleFilterVisibility(false);
    this.setOriginalEvents();

    const startPeriod = moment().startOf(filterData.period).startOf('d');
    const endPeriod = moment().endOf(filterData.period).endOf('d');

    this.filteredEvents = this.filteredEvents
      .filter((e) => {
        return filterData.types.indexOf(e.type) !== -1;
      })
      .filter((e) => {
        return filterData.categories.indexOf(e.category.toString()) !== -1;
      })
      .filter((e) => {
        const momentDate = moment(e.date, 'DD.MM.YYYY HH:mm:ss');
        return momentDate.isBetween(startPeriod, endPeriod);
      });

    this.calculateChartData();
  }

  onFilterCancel() {
    this.toggleFilterVisibility(false);
    this.setOriginalEvents();
    this.calculateChartData();
  }

  ngOnDestroy() {
    if (this.subscription1) {
      this.subscription1.unsubscribe();
    }
  }

}
