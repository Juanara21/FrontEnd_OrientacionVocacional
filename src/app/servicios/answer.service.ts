import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Answer } from '../interfaces/answer';

import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AnswerService {

  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl =  'http://localhost:3001/';
    this.myApiUrl = 'api/answer/';
   }

   newAnswer(answer: Answer): Observable<any> {
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}`, answer);
   }

   
}

