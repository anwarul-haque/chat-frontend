import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChatService } from '../../chat.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  password: string = '';
  user_name: string = '';
  error_message:string = ''
  constructor(private chateService: ChatService, private router: Router) {}

  ngOnInit(): void {
    document.body.style.backgroundColor = '#4f5d73';
  }

  onSubmit() {
    if (!this.user_name || !this.password) {
      return;
    } else {

      this.chateService
        .login({ user_name: this.user_name, password: this.password })
        .subscribe(
          (res: any) => {
            localStorage.setItem('user_data', JSON.stringify(res));
            this.router.navigate(['user']);
          },
          (err) => {
            this.error_message = err.error.error;
          }
        );
    }
  }

  signUp(){
    this.router.navigate(['sign-up']);
  }
}
