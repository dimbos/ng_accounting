import { Component, Input } from '@angular/core';

@Component({
  selector: 'sky-currency-card',
  templateUrl: './currency-card.component.html',
  styleUrls: ['./currency-card.component.css']
})
export class CurrencyCardComponent{

  @Input() currency: any;
  @Input() currencyUSD: any;
  private currencies: string[] = ['RUB'];



}
