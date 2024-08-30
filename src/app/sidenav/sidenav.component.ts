import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit{

  loading: boolean = false;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

ngOnInit(): void {
  this.router.navigate(['/dashboard/miperfil']);
}

  constructor(private breakpointObserver: BreakpointObserver, private router: Router) {}

  logOut() {
    this.loading = true;
    localStorage.removeItem('token');    
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 500);
  }

}
