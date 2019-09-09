import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import {Observable, combineLatest, Subscription} from 'rxjs';
import { BillService } from '../../shares/services/bill.service';
import { Bill } from '../../shares/models/bill.model';

@Component({
  selector: 'sky-bill-card',
  templateUrl: './bill-card.component.html',
  styleUrls: ['./bill-card.component.css']
})
export class BillCardComponent implements OnInit, OnDestroy {

  @Input() bill: Bill;
  @Input() currency: any;
  @Input() currencyUSD: any;

  private euro: number;
  private usd: number;

  constructor() { }

  ngOnInit() {
    let {rates} = this.currency;
    let curUSD = this.currencyUSD;
    this.euro = this.bill.value / rates['RUB'];
    this.usd = this.bill.value / curUSD;

  }

  ngOnDestroy(){

  }

}
