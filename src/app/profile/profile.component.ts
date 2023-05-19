import { Component, OnInit } from '@angular/core';
import { Data, Router } from '@angular/router';
import { PersonasService } from '../servicios/personas.service';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {MatTableDataSource} from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from 'src/app/servicios/error_service';
import { User } from '../interfaces/user';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{

  editable: boolean = false;
  listUser!: User;
  primer_nombre: string = '';
  segundo_nombre: string = '';
  primer_apellido: string = '';
  segundo_apellido: string = '';
  email: string = '';
  tipo_identificacion: string = '';
  identificacion: number = 0;
  sexo: string = '';

  

  
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

    
    const token = localStorage.getItem('token') ?? '';
    
    const decodedToken: any = jwt_decode(token);
    const usuario = decodedToken.username;    

    this._personasService.obtenerUsernameUser(usuario).subscribe((data: User) => {
    this.listUser = data
    console.log(this.listUser)
   
    this.primer_nombre = data.primer_nombre;
    this.segundo_nombre = data.segundo_nombre;
    this.primer_apellido = data.primer_apellido;
    this.segundo_apellido = data.segundo_apellido;
    this.email = data.email;
    this.tipo_identificacion = data.tipo_identificacion;
    this.identificacion = data.identificacion;
    this.sexo = data.sexo;
 
  })
}

  
}
