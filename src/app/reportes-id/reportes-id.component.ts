import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { ReportesService } from '../servicios/reportes.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { ErrorService } from 'src/app/servicios/error_service';
import { Reporte } from '../interfaces/reporteUser';

@Component({
  selector: 'app-reportes-id',
  templateUrl: './reportes-id.component.html',
  styleUrls: ['./reportes-id.component.css']
})
export class ReportesIdComponent implements OnInit {
  closeResult!: string;
  displayedColumns: string[] = ['primer_nombre','primer_apellido','carrera','afinidad']; 
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

    const id = this.obtenerId();
    this._reportesService.obtenerIdAfinidad(id).subscribe((data: Reporte[]) => {
    this.listReporte = data
    
    this.dataSource = new MatTableDataSource<Reporte>(this.listReporte);
    this.dataSource.paginator = this.paginator;
      
    })
    this.cambiar = false;
  }
  obtenerId() {
    const token = localStorage.getItem('token') ?? '';    
    const decodedToken: any = jwt_decode(token);
    const usuario = decodedToken.id;
    return usuario
}
 

}
