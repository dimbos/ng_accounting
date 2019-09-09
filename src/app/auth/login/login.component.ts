import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/shared/services/users.service';
import {User} from '../../shared/model/user.model';
import {Message} from '../../shared/model/message.model';
import {AuthSrvice} from '../../shared/services/auth.service';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { fadeStateTrigger } from 'src/app/shared/animations/fade.animation';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'sky-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [fadeStateTrigger]
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  message: Message;

  constructor(private usersService: UserService,
              private authService: AuthSrvice,
              private router: Router,
              private route: ActivatedRoute,
              private title: Title,
              private meta: Meta
    ) { 
      title.setTitle('Вход в систему');
      meta.addTags([
        {name: 'keywords', content: 'логин, вход, система'},
        {name: 'deskription', content: 'Вход в систему'}
      ])

  }

  private showMessage(message: Message){
    this.message = message;
    window.setTimeout(() => {
      this.message.text = '';
    }, 5000)
  }

  ngOnInit() {
    this.message = new Message('danger', '');
    this.route.queryParams.subscribe((params: Params) => {
      if(params['nowCanLogin']){
        this.showMessage({
          text: 'Теперь вы можете зайти в систему', 
          type: 'success',
        });
      } else if(params['accessDenied']){
        this.showMessage({
          text: 'Для работы с системой необходимо войти', 
          type: 'warning',
        });
      }
    })
    
    this.form = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)])
    })
  }

  onSubmit(){
    const formData =  this.form.value;
    this.usersService.getUserByEmail(formData.email)
    .subscribe((user :User) => {
      if(user){
          if(user.password === formData.password){
            this.message.text = '';
            window.localStorage.setItem('user', JSON.stringify(user))
              this.authService.login();
              this.router.navigate(['/system', 'bill']);
          } else{
            this.showMessage({
              text: 'Пароль не верный',
              type: 'danger'
              });
          }
      } else{
       this.showMessage({
        text: 'Пользователя нет',
        type: 'danger'
      });
      }
    });
    ;
  }

}
;