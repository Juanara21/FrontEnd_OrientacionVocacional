import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SigninComponent } from './singin/singin.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { ToastrModule } from "ngx-toastr";
import { HttpClientModule, HTTP_INTERCEPTORS} from "@angular/common/http";
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';

import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { AuthGuard } from "./utils/auth.guard";
import { SidenavComponent } from './sidenav/sidenav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';

import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

const appRoutes: Routes = [
 
  { path:'', redirectTo: 'login', pathMatch: 'full'},
  { path:'login',component:LoginComponent},  
  { path:'signIn',component:SigninComponent},
  { path:'dashboard',component:SidenavComponent , canActivate:[AuthGuard], children: [
    { path:'header',component:HeaderComponent}
  ]},
  { path: '**', redirectTo: 'dashboard', pathMatch: 'full' }
  
  
  ];


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SigninComponent,
  
    FooterComponent,
    HeaderComponent,
    SpinnerComponent,
    SidenavComponent,
  
 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatCardModule,
    FormsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
     
    }),
    HttpClientModule,
    LayoutModule,
    MatSidenavModule,
    MatListModule,
    MatGridListModule,
    MatMenuModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
