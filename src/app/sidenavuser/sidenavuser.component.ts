import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenavuser',
  templateUrl: './sidenavuser.component.html',
  styleUrls: ['./sidenavuser.component.css']
})
export class SidenavuserComponent {

  
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private router: Router) {}

  logOut() {
    localStorage.removeItem('token');
    this.router.navigate(['/login'])
  }
}
