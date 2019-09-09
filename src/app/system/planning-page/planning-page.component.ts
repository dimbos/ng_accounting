import { Component, OnInit, OnDestroy } from '@angular/core';
import { BillService } from '../shares/services/bill.service';
import { CategoriesService} from '../shares/services/categories.service';
import { EventService } from '../shares/services/event.service';
import {Observable, combineLatest, Subscription} from 'rxjs';
import { Category } from '../shares/models/category.model';
import { Bill } from '../shares/models/bill.model';
import { SKYEvent } from '../shares/models/event.model';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-planning-page',
  templateUrl: './planning-page.component.html',
  styleUrls: ['./planning-page.component.css']
})
export class PlanningPageComponent implements OnInit, OnDestroy {
  isLoaded = false;
  bill: Bill;
  categories: Category[] = [];
  events: SKYEvent[] = [];

  subscribtion1: Subscription;

  constructor(private billService: BillService, 
              private categoryService: CategoriesService,
                private eventsService: EventService,
                private title: Title
            ) { 
              title.setTitle('Планирование');
            }

  ngOnInit() {

    this.subscribtion1 = combineLatest(
      this.billService.getBill(),
      this.categoryService.getCategories(),
      this.eventsService.getEvents()
    ).subscribe((data: [Bill, Category[], SKYEvent[]]) =>  {
      this.bill = data[0];
      this.categories = data[1];
      this.events = data[2];
      this.isLoaded = true;
    })
  }

  getCategoryCost(cat: Category): number{
    const catEvents = this.events.filter((event) => event.category === cat.id && event.type === 'outcome')
    return catEvents.reduce((total, event) => {
      total += event.amount;
      return total;
    }, 0);
  }

  private getPercent(cat: Category): number{
    const percent = (100 * this.getCategoryCost(cat)) / cat.capacity;
    return percent > 100 ? 100 : percent;
  }

  getCatPercent(cat: Category): string{
    return this.getPercent(cat) + '%';
  }

  getColorClass(cat: Category){
    const percent = this.getPercent(cat);
    return percent < 60 ? 'success' : percent >=100 ? 'danger' : 'warning';
  }

  ngOnDestroy(){
    if(this.subscribtion1)
      this.subscribtion1.unsubscribe();
  }


}
