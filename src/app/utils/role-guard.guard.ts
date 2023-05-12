import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate,Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardGuard implements CanActivate {
  private isRedirecting: boolean = false;

  constructor(private router: Router) {

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      const token = localStorage.getItem('token') ?? '';
    
      const decodedToken: any = jwt_decode(token);
      const rol = decodedToken.rol; 
  
      if (rol === 'admin' && !this.isRedirecting) {
        this.isRedirecting = true;
        return this.router.navigate(['/dashboard']);
      } else if (rol === 'user' && !this.isRedirecting) {
        this.isRedirecting = true;
        return this.router.navigate(['/dashboardUser']);
      }
  
      this.isRedirecting = false;
      return true;
    }
  
}
