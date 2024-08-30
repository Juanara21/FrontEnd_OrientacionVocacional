import { Component, OnInit } from '@angular/core';
import { Data, Router } from '@angular/router';

import { PersonasService } from '../../servicios/personas.service';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AfterViewInit,  ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from 'src/app/servicios/error_service';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-usuarios-admin',
  templateUrl: './usuarios-admin.component.html',
  styleUrls: ['./usuarios-admin.component.css']
})
export class UsuariosAdminComponent implements OnInit {
  closeResult!: string;
  displayedColumns: string[] = ['id', 'primer_nombre','segundo_nombre','primer_apellido','segundo_apellido','email','tipo_identificacion','identificacion','sexo']; 
  listUser: User[] = [];
  dataSource!: MatTableDataSource<any>;
 
  
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  

  ngOnInit() {
    this.obtenerUser();
  }
  

  constructor(
    private toastr: ToastrService, 
    private router: Router, 
    private _personasService: PersonasService,
    private modalService: NgbModal,
    private _errorService: ErrorService ) { }

  
  obtenerUser() {
   

    this._personasService.obtenerUser().subscribe((data: User[]) => {
    this.listUser = data.map(item => ({ ...item, actions: '' }));
    
    this.dataSource = new MatTableDataSource<User>(this.listUser);
    this.dataSource.paginator = this.paginator;
      
    })
  }

}
