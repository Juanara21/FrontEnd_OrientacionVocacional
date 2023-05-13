import { Component, OnInit } from '@angular/core';
import { Data, Router } from '@angular/router';
import { Career } from '../interfaces/career';
import { CareerService } from '../servicios/career.service';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AfterViewInit,  ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  closeResult!: string;
  displayedColumns: string[] = ['id', 'Carrera']; 
  listCareer: Career[] = [];
  dataSource!: MatTableDataSource<any>;
  
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  

  ngOnInit() {
    this.obtenerCareer();
  }
  

  constructor(private router: Router, private _careerService: CareerService,private modalService: NgbModal ) { }

  
  obtenerCareer() {
   

    this._careerService.obtenerCareer().subscribe((data: Career[]) => {
    this.listCareer = data;
    console.log(this.listCareer);
    this.dataSource = new MatTableDataSource<Career>(this.listCareer);
    this.dataSource.paginator = this.paginator;
      
    })
  }

  open(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
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

  
   
  
