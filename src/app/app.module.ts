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
import { JwtModule } from '@auth0/angular-jwt';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { SidenavuserComponent } from './sidenavuser/sidenavuser.component';
import { CuestionarioComponent } from './cuestionario/cuestionario.component';
import { RoleGuardGuard } from './utils/role-guard.guard';
import { AddTokenInterceptor } from './utils/add-token.interceptor';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PreguntasAdminComponent } from './preguntas-admin/preguntas-admin.component';
import { UsuariosAdminComponent } from './usuarios-admin/usuarios-admin.component';
import { ProfileComponent } from './profile/profile.component';

const appRoutes: Routes = [
 
  { path:'', redirectTo: 'login', pathMatch: 'full'},
  { path:'login',component:LoginComponent},  
  { path:'signIn',component:SigninComponent},
  { path:'dashboard',component:SidenavComponent , canActivate:[AuthGuard,RoleGuardGuard], children: [
    { path:'header',component:HeaderComponent},
    { path:'questionAdmin',component:PreguntasAdminComponent},
    { path:'userAdmin',component:UsuariosAdminComponent},
  ]},
  { path:'dashboardUser',component:SidenavuserComponent , canActivate:[AuthGuard,RoleGuardGuard], children: [
    { path:'cuestionario',component:CuestionarioComponent},
    { path:'miperfil',component:ProfileComponent}
    
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
    SidenavuserComponent,
    PreguntasAdminComponent,
    UsuariosAdminComponent,
    ProfileComponent,
  
 
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
    JwtModule,
    NgbModule,
    

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AddTokenInterceptor, multi: true }
 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
