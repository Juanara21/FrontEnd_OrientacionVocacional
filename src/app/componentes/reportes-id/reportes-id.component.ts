import { Component, OnInit, AfterViewInit,  ElementRef } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { ChartComponentLike } from 'chart.js';

import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { ReportesService } from '../../servicios/reportes.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { ErrorService } from 'src/app/servicios/error_service';
import { Reporte } from '../../interfaces/reporteUser';

@Component({
  selector: 'app-reportes-id',
  templateUrl: './reportes-id.component.html',
  styleUrls: ['./reportes-id.component.css']
})
export class ReportesIdComponent implements OnInit  {
  closeResult!: string;
  displayedColumns: string[] = ['primer_nombre','primer_apellido','carrera','afinidad']; 
  listReporte: Reporte[] = [];
  dataSource!: MatTableDataSource<any>;
  cambiar: boolean = false;

   registerables: ChartComponentLike[] = [ /* Agrega los objetos ChartComponentLike aquí */ ];

 
  
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild('chartCanvas', { static: true }) chartCanvas!: ElementRef;


  ngOnInit() {
    this.obtenerReportes();
    Chart.register(...registerables);
   
    

  }
  

  constructor(
    private toastr: ToastrService, 
    private router: Router, 
    private _reportesService: ReportesService,
    private modalService: NgbModal,
    private _errorService: ErrorService ) { }

  
  obtenerReportes() { 

    

    const id = this.obtenerId();
    this._reportesService.obtenerIdAfinidad(id).subscribe((data: Reporte[]) => {
    this.listReporte = data 
    const isEmpty = Object.keys(data).length === 0;
    this.dataSource = new MatTableDataSource<Reporte>(this.listReporte);
    this.dataSource.paginator = this.paginator;  
    this.generarGraficoBarras();
    if (isEmpty) {
      this.toastr.info(`Aun no realizas el test, seras redirecionado`, 'No hay reportes');
      this.router.navigate(['/dashboardUser/test']);
    }    
    })
    
    this.cambiar = false;
  }
  obtenerId() {
    const token = localStorage.getItem('token') ?? '';    
    const decodedToken: any = jwt_decode(token);
    const usuario = decodedToken.id;
    return usuario
}

generarGraficoBarras() {
  

  const canvas = document.getElementById('barChart') as HTMLCanvasElement;

  const ctx = canvas.getContext('2d');
  
  if (ctx) {
    // Obtén los datos necesarios para el gráfico
    const carreras = this.listReporte.map((reporte) => reporte.carrera);
    const afinidades = this.listReporte.map((reporte) => reporte.afinidad);
   
   
    // Crea el gráfico de barras
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: carreras,
        datasets: [{
          label: 'Afinidad',
          data: afinidades,
          backgroundColor: 'rgba(75, 192, 192, 0.6)', // Color de fondo de las barras
          borderColor: 'rgba(75, 192, 192, 1)', // Color del borde de las barras
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            max: 100 // Puedes ajustar el valor máximo del eje Y según tus necesidades
          }
        }
      }
    });
  }
}


}
