import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ChatService } from '../../chat.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  roomList: any = [];
  userData:any;
  constructor(private router: Router, private chateService: ChatService) {}
  

  ngOnInit(): void {
    document.body.style.backgroundColor = '#4f5d73';
    let loclUser:any = localStorage.getItem('user_data');
    this.userData = JSON.parse(loclUser);
    if (!this.userData) {
      this.router.navigate(['']);
    }

    this.getRooms();
  }

  chat(room: any) {
    if(room.group){
      this.router.navigate(['chat', room._id]);
    }else{
      let userArra = [];
      userArra.push(this.userData.user._id);
      userArra.push(room.user_id);
      this.createRoom(userArra)
    }
  }


  getRooms() {
    this.chateService.getRooms().subscribe(
      (res: any) => {
        
        if(res.room)
          this.roomList = res.room;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  createRoom(userArr:any){

    this.chateService.createRoom({users:userArr}).subscribe(
      (res: any) => {
       
        if(res.room)
          this.router.navigate(['chat', res.room._id]);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
