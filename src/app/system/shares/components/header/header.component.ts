import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/model/user.model';
import { AuthSrvice } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'sky-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  date: Date = new Date();
  user: User;

  constructor(private authService: AuthSrvice,
              private router: Router,
              ) { }

  ngOnInit() {
    this.user = JSON.parse(window.localStorage.getItem('user'));
  }

  onLogout(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
