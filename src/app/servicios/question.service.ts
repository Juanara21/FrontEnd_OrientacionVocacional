import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Question } from '../interfaces/question';
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl =   'http://localhost:3001/';
    this.myApiUrl = 'api/question/';
   }
   newQuestion(question: Question): Observable<any> {
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}`, question);
   }

   obtenerQuestion(): Observable<Question[]> {
    return this.http.get<Question[]>(`${this.myAppUrl}${this.myApiUrl}`);
   }
  
 
   deleteQuestion(id: number): Observable<void> {
     return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${id}`)
   }
 
   updateQuestion(id: number, question: Question): Observable<void> {
     return this.http.patch<void>(`${this.myAppUrl}${this.myApiUrl}${id}`, question);
   }
}
