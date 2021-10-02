import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ChatService } from 'src/app/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  feedBack: string = '';
  output: any = [];


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private chateService: ChatService
  ) {}

  inputMessage: string = '';
  user: any;
  receiver_user_id:any = '';
  userData:any;
  messages: any[] = [
    { myChat: true, message: 'Hi' },
    { myChat: true, message: 'How are you?' },
    { myChat: false, message: 'Hello, How are you?' },
    { myChat: false, message: 'I am good' },
    { myChat: true, message: 'me too' },
    { myChat: false, message: 'good to see you' },
    { myChat: false, message: 'when we can meet?' },
    { myChat: true, message: 'soon' },
    { myChat: false, message: 'ok' },
  ];
  userList: any = [];
  scrollHeight: number = 0;
  roomId:any = '';
  room:any;
  sender:any;
  ngOnInit(): void {
    let user: any = localStorage.getItem('user_data');
    this.userData = JSON.parse(user);
    this.sender = this.userData.user;
    // this.roomId = this.userData.user.room_id;
    document.body.style.backgroundColor = '#4f5d73';
    // this.userList = this.chateService.userList;
    // if (!this.userList?.length) {
    //   this.router.navigate(['user']);
    // }
    this.route.paramMap.subscribe((data) => {
      this.roomId = data.get('user_id');
      
      this.chateService.emit('join_room', this.roomId)
      // this.user = this.userList?.find((data: any) => data._id == this.receiver_user_id);
    });


    this.chateService.listen('typing').subscribe((data) => this.updateFeedback(data));
    this.chateService.listen('chat').subscribe((data) => this.updateMessage(data));
    this.getMessage();
    // this.chateService.listen('join_room').subscribe((data) => this.updateRoomJoin(data));
  }
  // updateRoomJoin(data: any): void {
  //   console.log(data);
  //   // this.roomId = data;
  // }
  updateMessage(data: any): void {
   this.feedBack ='';
   if(!!!data){
     return
   }
    this.output.push(data);
     
    console.log(this.output);
     
  }
  updateFeedback(data: any): void {
    this.feedBack = `${data} is typing a message`;
    console.log(this.feedBack);
  }

  messageTyping(): void {
   
    this.chateService.emit('typing', this.room.name)
    
  }

  sendMessage() {
    if (!this.inputMessage) return;

    let msgObj = {
      room:this.roomId,
      user:this.sender._id,
      message:this.inputMessage,
      user_name:this.sender.user_name,
    }
    // console.log(msgObj);
    

    this.chateService.emit('chat', msgObj);
    
    this.inputMessage = '';

  }


  getMessage(){
    this.chateService.getRoom(this.roomId).subscribe(
      (res: any) => {
      
      this.room = res.room;
      this.output = res.message;
      },
      (err) => {
        console.log(err);
        
        // this.error_message = err.error.error;
      }
    );
  }
}
