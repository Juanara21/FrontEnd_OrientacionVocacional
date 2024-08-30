import { Component, OnInit } from '@angular/core';
import { Data, Router } from '@angular/router';
import { Career } from '../../interfaces/career';
import { CareerService } from '../../servicios/career.service';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AfterViewInit,  ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from 'src/app/servicios/error_service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  closeResult!: string;
  displayedColumns: string[] = ['id', 'Carrera','actions']; 
  listCareer: Career[] = [];
  dataSource!: MatTableDataSource<any>;
  nuevaCarrera: string = '';
  updatedCarrera: string = '';
  
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  

  ngOnInit() {
    this.obtenerCareer();
  }
  

  constructor(
    private toastr: ToastrService, 
    private router: Router, 
    private _careerService: CareerService,
    private modalService: NgbModal,
    private _errorService: ErrorService ) { }

  
  obtenerCareer() {
   

    this._careerService.obtenerCareer().subscribe((data: Career[]) => {
    this.listCareer = data.map(item => ({ ...item, actions: '' }));
    
    this.dataSource = new MatTableDataSource<Career>(this.listCareer);
    this.dataSource.paginator = this.paginator;
      
    })
  }

  addCareer() {

    // Validamos que el usuario ingrese valores
    if (this.nuevaCarrera == '' ) {
      this.toastr.error('Todos los campos son obligatorios', 'Error');
      return;
    }  
    // Creamos el objeto
    const career: Career = {      
      career: this.nuevaCarrera
    }

    this._careerService.newCareer(career).subscribe({
      next: (v) => {
        this.obtenerCareer();
        this.toastr.success(`La Carrera ${this.nuevaCarrera} fue registrada con exito`, 'Carrera registrada');
       
      },
      error: (e: HttpErrorResponse) => {
              this._errorService.msjError(e);
      }
    })
  }

  deleteCareer(id: number) {
    
    this._careerService.deleteCareer(id).subscribe(() => {
      this.obtenerCareer();
      this.toastr.warning('La Carrera fue eliminada con exito', 'Carrera eliminada');
    })
  }

  updateCareer(id: number) {
 

    const career: Career = {         
      career: this.updatedCarrera
    }
     
    this._careerService.updateCareer(id,career).subscribe(
      () => {
        this.toastr.success(`La Carrera ${this.updatedCarrera} fue actualizada con éxito`, 'Carrera actualizada');
        this.obtenerCareer();     
      },
      (error: HttpErrorResponse) => {
        this._errorService.msjError(error);
      }
    );
  }
  
  
  open(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then(
      (result) => {
      this.addCareer();

     

      this.nuevaCarrera = '';

      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openUpdateModal(content: any, careerId: number) {

    this.updatedCarrera = '';  
    // Buscar la carrera en la lista por el ID
    const career = this.listCareer.find(c => c.id === careerId);
    if (career) {
    this.updatedCarrera = career.career;
    } 

   this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
        (result) => {

      this.updateCareer(careerId);

      

      this.updatedCarrera = '';
          
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

  
   
  
