
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Reporte } from '../interfaces/reporteUser';
import { Observable } from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class ReportesService {

  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl =   'http://localhost:3001/';
    this.myApiUrl = 'api/reportes/';
   }
   
   obtenerReportes(): Observable<Reporte[]> {
    return this.http.get<Reporte[]>(`${this.myAppUrl}${this.myApiUrl}`);
   }
   obtenerMayorAfinidad(): Observable<Reporte[]> {
    return this.http.get<Reporte[]>(`${this.myAppUrl}${this.myApiUrl}user`);
   }
   obtenerIdAfinidad(id: number): Observable<Reporte[]> {
    return this.http.get<Reporte[]>(`${this.myAppUrl}${this.myApiUrl}${id}`);
   }
  
 
}
