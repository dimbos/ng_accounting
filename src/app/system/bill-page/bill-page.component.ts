import { Component, OnInit, OnDestroy } from '@angular/core';
import { BillService } from '../shares/services/bill.service';
import {Observable, combineLatest, Subscription} from 'rxjs';
import { Bill } from '../shares/models/bill.model';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-bill-page',
  templateUrl: './bill-page.component.html',
  styleUrls: ['./bill-page.component.css']
})
export class BillPageComponent implements OnInit, OnDestroy {
  subscription1: Subscription;
  subscription2: Subscription;
  subscription3: Subscription;
  subscription4: Subscription;
  currency: any;
  currencyUSD: any;
  bill: Bill;
  isLoaded = false;

  constructor(private billService: BillService,
              private title: Title
              ) {
                title.setTitle('Счет');
               }

  ngOnInit() {
    this.subscription1 = combineLatest(
      this.billService.getBill(),
      this.billService.getCurrency(),
      this.billService.getCurrencyUSD(),
    ).subscribe((data: [Bill, any, any]) => {
      this.bill = data[0];
      this.currency = data[1];
      this.currencyUSD = data[2].quotes['USDRUB'];
      this.isLoaded = true;
    }); 
    
  }

  onRefresh() {
    this.isLoaded = false;
    this.subscription2 = this.billService.getCurrency().subscribe((currency: any) => {
      this.currency = currency;
      this.isLoaded = true;
    })
    this.subscription3 = this.billService.getCurrencyUSD().subscribe((data: any) => {
      this.currencyUSD = data.quotes['USDRUB'];
    })
  }

  ngOnDestroy(){
    if(this.subscription1){
      this.subscription1.unsubscribe();
    }
    if(this.subscription2) {
      this.subscription2.unsubscribe();
    }
    if(this.subscription3) {
      this.subscription3.unsubscribe();
    }
  }

}
