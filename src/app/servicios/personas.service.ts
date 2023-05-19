import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { Password } from '../interfaces/changePassword';

import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PersonasService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl =  'http://localhost:3001/';
    this.myApiUrl = 'api/users/';
   }

   obtenerUser(): Observable<User[]> {
    return this.http.get<User[]>(`${this.myAppUrl}${this.myApiUrl}`);
   }
   obtenerUsernameUser(username: string): Observable<User> {
    return this.http.get<User>(`${this.myAppUrl}${this.myApiUrl}user/${username}`);
   }
   changePasswor( password: Password, username: string): Observable<void> {
    return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}user/${username}`,password);
  }
  updateUser(user: User,  username: string):  Observable<void> {
    return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}${username}`,user);
   }
}
