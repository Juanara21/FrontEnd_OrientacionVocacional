import { Component, OnInit } from '@angular/core';
import { Data, Router } from '@angular/router';
import { PersonasService } from '../../servicios/personas.service';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {MatTableDataSource} from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from 'src/app/servicios/error_service';
import { User } from '../../interfaces/user';
import { Password } from '../../interfaces/changePassword';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
  closeResult!: string;
  contrasenaNueva: string = '';
  contrasenaActual: string = '';
  password!: Password;
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

  obtenerUsername() {
    const token = localStorage.getItem('token') ?? '';    
    const decodedToken: any = jwt_decode(token);
    const usuario = decodedToken.username;
    return usuario
  }
  
  obtenerUser() {  
    const usuario = this.obtenerUsername();

    this._personasService.obtenerUsernameUser(usuario).subscribe((data: User) => {
    this.listUser = data
    
   
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

updatePassword() {

  const usuario = this.obtenerUsername();
      
  if (this.contrasenaNueva == '' || this.contrasenaActual == '' ) {
    this.toastr.error('Todos los campos son obligatorios', 'Error');
    return;
  }

  const password: Password = {         
    oldPassword: this.contrasenaActual,
    newPassword: this.contrasenaNueva,
  }
   
  this._personasService.changePasswor(password, usuario).subscribe(
    () => {
      this.toastr.success(`La contraseña fue actualizada con éxito`, 'Contraseña actualizada');
          
    },
    (error: HttpErrorResponse) => {
      this._errorService.msjError(error);
    }
  );
}

updateUser() {

  const usuario = this.obtenerUsername();
  // Validamos que el usuario ingrese valores
  if (this.primer_nombre == ''||  this.primer_apellido == '' || this.segundo_apellido == '' || this.email == '' || this.tipo_identificacion == '' || this.identificacion == 0 || this.sexo == '' ) {
    this.toastr.error('Todos los campos son obligatorios', 'Error');
    return;
  }

  

  // Creamos el objeto
  const user: User = {
   
    primer_nombre: this.primer_nombre,
    segundo_nombre: this.segundo_nombre,
    primer_apellido: this.primer_apellido,
    segundo_apellido: this.segundo_apellido,
    email: this.email,
    tipo_identificacion: this.tipo_identificacion,
    identificacion: this.identificacion,
    sexo: this.sexo
  }

  this._personasService.updateUser(user, usuario ).subscribe({
    next: (v) => {
     
      this.toastr.success(`El usuario ${usuario} fue actualizado con exito`, 'Usuario actualizado');
      this.obtenerUsername();
      this.editable = false;
    },
    error: (e: HttpErrorResponse) => {
     
      this._errorService.msjError(e);
    }
  })
}



openUpdateModal(content: any) {

   this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
    
        this.updatePassword()

        this.contrasenaActual = '';
        this.contrasenaNueva = '';
            
        // Maneja el cierre del modal si es necesario
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  
}

private getDismissReason(reason: any): string {
  if (reason === ModalDismissReasons.ESC) {
    return 'by pressing ESC';
  } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
    return 'by clicking on a backdrop';
  } else {
    return `with: ${reason}`;
  }
} 
}
