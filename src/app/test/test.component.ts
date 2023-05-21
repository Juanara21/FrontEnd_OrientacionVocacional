import { Component, OnInit } from '@angular/core';
import { Data, Router } from '@angular/router';
import { Question } from '../interfaces/question';
import { QuestionService } from '../servicios/question.service';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AfterViewInit,  ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from 'src/app/servicios/error_service';
import { Career } from '../interfaces/career';
import { CareerService } from '../servicios/career.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  listQuestion: Question[] = [];

  ngOnInit() {

    this.obtenerCareer();
  }

  constructor(
    private toastr: ToastrService, 
    private router: Router, 
    private _questionService: QuestionService,
    private modalService: NgbModal,
    private _errorService: ErrorService,
    private _careerService: CareerService ) { }

  obtenerCareer() {  

    this._questionService.obtenerQuestion().subscribe((data: Question[]) => {
    this.listQuestion = data   
      
    })
  }

}
