import { BaseApi } from 'src/app/shared/core/base-api';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { SKYEvent } from '../../shares/models/event.model';
import { Observable } from 'rxjs';

@Injectable()
export class EventService extends BaseApi {
    constructor (public http: Http){
        super(http);
    }


    addEvent(event: SKYEvent): Observable<SKYEvent>{
        return this.post('events', event)
    }

    getEvents(): Observable<SKYEvent[]>{
        return this.get('events');
    }

    getEventById(id: string): Observable<SKYEvent>{
        return this.get(`events/${id}`)
    }

}