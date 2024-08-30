import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './componentes/login/login.component';
import { SigninComponent } from './componentes/singin/singin.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { ToastrModule } from "ngx-toastr";
import { HttpClientModule, HTTP_INTERCEPTORS} from "@angular/common/http";
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import {MatRadioModule} from '@angular/material/radio';
import { FooterComponent } from './layout/footer/footer.component';
import { HeaderComponent } from './componentes/header/header.component';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { AuthGuard } from "./utils/auth.guard";
import { SidenavComponent } from './layout/sidenav/sidenav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { JwtModule } from '@auth0/angular-jwt';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { SidenavuserComponent } from './layout/sidenavuser/sidenavuser.component';

import { RoleGuardGuard } from './utils/role-guard.guard';
import { AddTokenInterceptor } from './utils/add-token.interceptor';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PreguntasAdminComponent } from './componentes/preguntas-admin/preguntas-admin.component';
import { UsuariosAdminComponent } from './componentes/usuarios-admin/usuarios-admin.component';
import { ProfileComponent } from './componentes/profile/profile.component';
import { TestComponent } from './componentes/test/test.component';
import { ReportesUserComponent } from './componentes/reportes-user/reportes-user.component';
import { ReportesIdComponent } from './componentes/reportes-id/reportes-id.component';

const appRoutes: Routes = [
 
  { path:'', redirectTo: 'dashboard', pathMatch: 'full'},
  { path:'login',component:LoginComponent},  
  { path:'signIn',component:SigninComponent},
  { path:'dashboard',component:SidenavComponent , canActivate:[AuthGuard,RoleGuardGuard], children: [
    { path:'miperfil',component:ProfileComponent},
    { path:'header',component:HeaderComponent},
    { path:'questionAdmin',component:PreguntasAdminComponent},
    { path:'userAdmin',component:UsuariosAdminComponent},
    { path:'reportesAdmin',component:ReportesUserComponent },
  ]},
  { path:'dashboardUser',component:SidenavuserComponent , canActivate:[AuthGuard,RoleGuardGuard], children: [
    { path:'miperfil',component:ProfileComponent},
    { path:'test',component:TestComponent}, 
    { path:'reportesId',component:ReportesIdComponent },
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
    TestComponent,
    ReportesUserComponent,
    ReportesIdComponent,
  
 
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
    MatRadioModule,
    

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AddTokenInterceptor, multi: true }
 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
