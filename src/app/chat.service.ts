import { Injectable } from '@angular/core';
import { observable, Observable, Subscriber } from 'rxjs';
import { io } from 'socket.io-client';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  public socket: any;
  public userList: any;
  constructor(private http: HttpClient) {
    this.socket = io(environment.BASE_SERVER_URL, {
      upgrade: false,
      transports: ['websocket'],
    });
  }

  send_message(message: any) {
    this.socket.emit('message', message);
  }
  receive_message() {
    this.socket.on('new message', (res: any) => {
      return res;
    });
  }

  login(data: any) {
    return this.http.post(`${environment.BASE_SERVER_URL}/user/login`, data);
  }
  signup(data: any) {
    return this.http.post(`${environment.BASE_SERVER_URL}/user/signup`, data);
  }
  getUsers() {
    let userData: any = localStorage.getItem('user_data');
    let user_data = JSON.parse(userData);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + user_data.token,
      }),
    };

    return this.http.get(
      `${environment.BASE_SERVER_URL}/user/all`,
      httpOptions
    );
  }
  getRooms() {
    let userData: any = localStorage.getItem('user_data');
    let user_data = JSON.parse(userData);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + user_data.token,
      }),
    };

    return this.http.get(
      `${environment.BASE_SERVER_URL}/user/room`,
      httpOptions
    );
  }
  getRoom(id:string) {
    let userData: any = localStorage.getItem('user_data');
    let user_data = JSON.parse(userData);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + user_data.token,
      }),
    };

    return this.http.get(
      `${environment.BASE_SERVER_URL}/user/room/${id}`,
      httpOptions
    );
  }


  createRoom(data:any) {
    let userData: any = localStorage.getItem('user_data');
    let user_data = JSON.parse(userData);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + user_data.token,
      }),
    };

    return this.http.post(
      `${environment.BASE_SERVER_URL}/user/room`, data,
      httpOptions
    );
  }

  listen(eventName: string): Observable<any> {
    return new Observable((subscribe) => {
      this.socket.on(eventName, (data: any) => {
        subscribe.next(data);
      });
    });
  }

  emit(eventName: string, data: any) {
    this.socket.emit(eventName, data);
  }
}
