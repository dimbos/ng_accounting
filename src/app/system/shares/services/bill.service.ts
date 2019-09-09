import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs';
import { Bill } from '../models/bill.model';
import { map } from 'rxjs/operators';
import { BaseApi } from 'src/app/shared/core/base-api';

@Injectable()
export class BillService  extends BaseApi{
    constructor (public http: Http){
        super(http);
    }
    getBill(): Observable <Bill>{
        return this.get('bill');
    }

    getCurrency(base: string = 'rub'): Observable<any>{
        return this.http.get(`http://data.fixer.io/api/latest?access_key=dc0a39ca58253170e162506a71f8e01e&base&=${base}`).pipe(map((response: Response) => response.json()));
    }

    updateBill(bill: Bill): Observable<Bill> {
        return this.put('bill', bill);
    }

    getCurrencyUSD(): Observable<any>{
        return this.http.get('http://apilayer.net/api/live?access_key=fb4ca19aade6fd7c3975d20dbf185cc3&currencies=RUB&source=USD&format=1').pipe(map((response: Response) => response.json()))
    }
}