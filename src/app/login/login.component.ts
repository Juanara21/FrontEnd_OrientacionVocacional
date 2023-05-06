import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from "src/app/interfaces/user";
import { Login } from "src/app/interfaces/login";
import { UserService } from "src/app/servicios/user.service";
import { ToastrService } from "ngx-toastr";
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from '../servicios/error_service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string = '';
  password: string = '';

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
    console.log(login);
    this._userService.login(login).subscribe({
      next: (token) => {
       
      localStorage.setItem('token', token);
      this.router.navigate(['/dashboard']);
      },
      error: (e: HttpErrorResponse) => {
        this._errorService.msjError(e);
        
      }
    })
}
}
