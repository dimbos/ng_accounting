import {HttpClient} from '@angular/common/http';
import {Http, Response} from '@angular/http';
import {Injectable} from '@angular/core';
import {User} from '../model/user.model';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseApi } from '../core/base-api';

@Injectable() 
export class UserService extends BaseApi{
    constructor(public http:  Http) {
        super(http);
    }

    getUserByEmail(email: string): Observable<User>{
        
        /*
        return this.http.get(`http://localhost:3000/users?email=${email}`)
        .pipe(map((response: Response)=> response.json()))
        .pipe(map((user: User[]) => user[0] ? user[0]: undefined ) )
        */
        //короткая запись
       return this.get(`users?email=${email}`).pipe(map((users: User) => users[0] ? users[0] : undefined));
    };

    createNewUser(user: User):Observable<User>{
        /*
        return this.http.post(`http://localhost:3000/users`, user)
        .pipe(map((response: Response) => response.json())
        )
        */
       return this.post(`users`, user)
    }
}