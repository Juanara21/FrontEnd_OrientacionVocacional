import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Career } from '../interfaces/career';

import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CareerService {

  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl =  'http://localhost:3001/';
    this.myApiUrl = 'api/career/';
   }

   newCareer(career: Career): Observable<any> {
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}`, career);
   }

   obtenerCareer(): Observable<Career[]> {
    return this.http.get<Career[]>(`${this.myAppUrl}${this.myApiUrl}`);
   }
  
 
   deleteCareer(id: number): Observable<void> {
     return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${id}`)
   }
 
   updateCareer(id: number, career: Career ): Observable<void> {
     return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}${id}`, career);
   }

}

