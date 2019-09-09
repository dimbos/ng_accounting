import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Category } from '../../shares/models/category.model';
import { NgForm } from '@angular/forms';
import { SKYEvent } from '../../shares/models/event.model';
import * as moment from 'moment';
import { EventService } from '../../shares/services/event.service';
import { BillService } from '../../shares/services/bill.service';
import { Bill } from '../../shares/models/bill.model';
import { mergeMap, map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Message } from 'src/app/shared/model/message.model';

@Component({
  selector: 'sky-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit, OnDestroy {
  @Input() categories: Category[] = [];
  types = [
    {type: 'income', label: 'Доход'},
    {type: 'outcome', label: 'Расход'}
  ];

  subscribe1: Subscription;
  subscribe2: Subscription;

  message: Message;

  constructor(private eventService: EventService,
              private billService: BillService
            ) { }

  ngOnInit() {
    this.message = new Message('danger', '');
  }

  private showMessage(text: string) {
    this.message.text = text;
    window.setTimeout(() => this.message.text = '', 5000);
  }

  onSubmit(form: NgForm){
    let {amount, description, category, type} = form.value;
    if (amount < 0) amount *= -1;

    const event = new SKYEvent(
      type, amount, +category,
      moment().format('DD.MM.YYYY HH:mm:ss'), description
    );

    this.subscribe1 = this.billService.getBill()
      .subscribe((bill: Bill) => {
        let value = 0;
        if (type === 'outcome') {
          if (amount > bill.value) {
            this.showMessage(`На счету недостаточно средств. Вам нехватает ${amount - bill.value}`);
            return;
          } else {
            value = bill.value - amount;
          }
        } else {
          value = bill.value + amount;
        }
     this.subscribe2 =  this.billService.updateBill({value, currency: bill.currency}).pipe(
     mergeMap(() => this.eventService.addEvent(event)))
     .subscribe(() => {
        form.setValue({
          amount: 0,
          description: ' ', 
          category: 1,
          type: 'outcome'
        });
      });
    });
  }

  ngOnDestroy() {
    if(this.subscribe1)
    {
      this.subscribe1.unsubscribe();
    }
    if(this.subscribe2)
    {
      this.subscribe2.unsubscribe();
    }
  }

}
