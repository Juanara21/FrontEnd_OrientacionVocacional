import { Component, OnInit } from '@angular/core';
import { Data, Router } from '@angular/router';

import { ReportesService } from '../../servicios/reportes.service';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AfterViewInit,  ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from 'src/app/servicios/error_service';
import { Reporte } from '../../interfaces/reporteUser';
@Component({
  selector: 'app-reportes-user',
  templateUrl: './reportes-user.component.html',
  styleUrls: ['./reportes-user.component.css']
})
export class ReportesUserComponent implements OnInit {
  closeResult!: string;
  displayedColumns: string[] = ['usuario_id', 'primer_nombre','primer_apellido','carrera','afinidad']; 
  listReporte: Reporte[] = [];
  dataSource!: MatTableDataSource<any>;
  cambiar: boolean = false;
 
  
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  

  ngOnInit() {
    this.obtenerReportes();
  }
  

  constructor(
    private toastr: ToastrService, 
    private router: Router, 
    private _reportesService: ReportesService,
    private modalService: NgbModal,
    private _errorService: ErrorService ) { }

  
  obtenerReportes() { 

    this._reportesService.obtenerReportes().subscribe((data: Reporte[]) => {
    this.listReporte = data
  
    this.dataSource = new MatTableDataSource<Reporte>(this.listReporte);
    this.dataSource.paginator = this.paginator;
      
    })
    this.cambiar = false;
  }
  obtenerReportesMayorAfinidad() {
    
    this._reportesService.obtenerMayorAfinidad().subscribe((data: Reporte[]) => {
      this.listReporte = data
      // console.log(this.listReporte)
      
      this.dataSource = new MatTableDataSource<Reporte>(this.listReporte);
      this.dataSource.paginator = this.paginator;
        
      })
      this.cambiar = true;

  }

}
