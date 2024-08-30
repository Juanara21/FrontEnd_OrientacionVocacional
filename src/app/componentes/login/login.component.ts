import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from "src/app/interfaces/user";
import { Login } from "src/app/interfaces/login";
import { UserService } from "src/app/servicios/user.service";
import { ToastrService } from "ngx-toastr";
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from '../../servicios/error_service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string = '';
  password: string = '';
  loading: boolean = false;

  constructor(private toast: ToastrService,
    private _userService: UserService,
    private router: Router,
    private _errorService: ErrorService) {   
  }

  ngOnInit(): void {    
  }

  login() {

    if (this.username == '' || this.password == '') {
      this.toast.error('Ingrese los datos del usuario y contraseña','Error');
      return
    }
    const login: Login = {
      username: this.username,
      password: this.password
    }
   
    this.loading = true;
    this._userService.login(login).subscribe({
      next: (token) => {

        localStorage.setItem('token', token);
        const decodedToken = jwt_decode<any>(token);
        const rol = decodedToken.rol;

     if (rol === 'admin') {
        // Redirigir a la ruta de administrador
        this.router.navigate(['/dashboard']);
        return;
    } else if (rol === 'user') {
        // Redirigir a la ruta de usuario
        this.router.navigate(['/dashboardUser']);
        return;
    }
       
     
     
      },
      error: (e: HttpErrorResponse) => {
        this._errorService.msjError(e);
        this.loading=false;
      }
    })
}
}
