import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { EventService } from '../../shares/services/event.service';
import { CategoriesService } from '../../shares/services/categories.service';
import { mergeMap } from 'rxjs/operators';
import { SKYEvent } from '../../shares/models/event.model';
import { Category } from '../../shares/models/category.model';
import { Subscription } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'sky-history-detail',
  templateUrl: './history-detail.component.html',
  styleUrls: ['./history-detail.component.css']
})
export class HistoryDetailComponent implements OnInit, OnDestroy {

  event: SKYEvent;
  category: Category;
  isLoaded = false;
  subscription: Subscription;

  constructor(private route: ActivatedRoute,
              private eventService: EventService,
              private categoriesService: CategoriesService,
              ) { 
              }

  ngOnInit() {
    this.subscription = this.route.params.pipe(
    mergeMap((params: Params) => this.eventService.getEventById(params['id'])),
    mergeMap((event: SKYEvent) => {
      this.event = event;
      return this.categoriesService.getCategoryById(event.category);
    }))
    .subscribe((category: Category) => {
      this.category = category;
      this.isLoaded = true;
    });
  }

  ngOnDestroy(){
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }

}
