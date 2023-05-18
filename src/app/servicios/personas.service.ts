import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';

import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PersonasService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl =  'http://localhost:3001/';
    this.myApiUrl = 'api/users';
   }

   obtenerUser(): Observable<User[]> {
    return this.http.get<User[]>(`${this.myAppUrl}${this.myApiUrl}`);
   }
}
