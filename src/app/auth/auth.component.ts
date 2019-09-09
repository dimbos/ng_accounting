import {Component, OnInit, HostBinding} from '@angular/core';
import { Router } from '@angular/router';
import { fadeStateTrigger } from '../shared/animations/fade.animation';

@Component({
    selector: 'sky-root',
    templateUrl: './auth.component.html',
    animations: [fadeStateTrigger]
})

export class AuthComponent implements OnInit{

    @HostBinding('@fade') anim = true

    constructor (private router: Router){}
    ngOnInit(){
        this.router.navigate(['/login']);
    }
}