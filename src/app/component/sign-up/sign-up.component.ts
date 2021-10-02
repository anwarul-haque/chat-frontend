import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChatService } from 'src/app/chat.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {


  password: string = '';
  user_name: string = '';
  error_message:string = ''
  image:string = '';

  constructor(private chateService: ChatService, private router: Router) {}

  ngOnInit(): void {
    document.body.style.backgroundColor = '#4f5d73';
  }

  onSubmit() {
    if (!this.user_name || !this.password) {
      return;
    } else {

      this.chateService
        .signup({ user_name: this.user_name, password: this.password, image:this.image })
        .subscribe(
          (res: any) => {
            localStorage.setItem('user_data', JSON.stringify(res));
            this.login();
          },
          (err) => {
            this.error_message = err.error.error;
          }
        );
    }
  }

  login(){
    this.router.navigate(['/']);
  }
}
