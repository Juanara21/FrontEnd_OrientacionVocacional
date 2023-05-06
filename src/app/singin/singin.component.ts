import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/interfaces/user';
import { ErrorService } from 'src/app/servicios/error_service';
import { UserService } from 'src/app/servicios/user.service';

@Component({
  selector: 'app-singin',
  templateUrl: './singin.component.html',
  styleUrls: ['./singin.component.css']
})
export class SigninComponent implements OnInit {
  username: string = '';
  password: string = '';
  confirmPassword: string = '';
  primer_nombre: string = '';
  segundo_nombre: string = '';
  primer_apellido: string = '';
  segundo_apellido: string = '';
  email: string = '';
  tipo_identificacion: string = '';
  identificacion!: number;
  sexo: string = '';
  loading: boolean = false;

  constructor(private toastr: ToastrService,
    private _userService: UserService,
    private router: Router,
    private _errorService: ErrorService) { }

  ngOnInit(): void {
  }

  addUser() {

    // Validamos que el usuario ingrese valores
    if (this.username == '' || this.password == '' || this.confirmPassword == '' || this.primer_nombre == ''||  this.primer_apellido == '' || this.segundo_apellido == '' || this.email == '' || this.tipo_identificacion == '' || this.identificacion == 0 || this.sexo == '' ) {
      this.toastr.error('Todos los campos son obligatorios', 'Error');
      return;
    }

    // Validamos que las password sean iguales
    if (this.password != this.confirmPassword) {
      this.toastr.error('Las passwords ingresadas son distintas', 'Error');
      return;
    }

    // Creamos el objeto
    const user: User = {
      username: this.username,
      password: this.password,
      primer_nombre: this.primer_nombre,
      segundo_nombre: this.segundo_nombre,
      primer_apellido: this.primer_apellido,
      segundo_apellido: this.segundo_apellido,
      email: this.email,
      tipo_identificacion: this.tipo_identificacion,
      identificacion: this.identificacion,
      sexo: this.sexo
    }

    this.loading = true;
    this._userService.signIn(user).subscribe({
      next: (v) => {
       
        this.toastr.success(`El usuario ${this.username} fue registrado con exito`, 'Usuario registrado');
        this.router.navigate(['/login']);
      },
      error: (e: HttpErrorResponse) => {
        this.loading = false;
        this._errorService.msjError(e);
      }
    })
  }
}
