import { Component, OnInit } from '@angular/core';
import { Data, Router } from '@angular/router';
import { Question } from '../../interfaces/question';
import { QuestionService } from '../../servicios/question.service';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AfterViewInit,  ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from 'src/app/servicios/error_service';
import { Career } from '../../interfaces/career';
import { CareerService } from '../../servicios/career.service';

@Component({
  selector: 'app-preguntas-admin',
  templateUrl: './preguntas-admin.component.html',
  styleUrls: ['./preguntas-admin.component.css']
})
export class PreguntasAdminComponent implements OnInit{
  closeResult!: string;
  displayedColumns: string[] = ['id', 'description','career','actions']; 
  dataSource!: MatTableDataSource<any>;
  nuevaQuestion: string = '';
  updatedQuestion: string = '';
  selectedCareerId: number = 0;


  
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  
  listQuestion: Question[] = [];
  careerList: Career[] = [];

 
  ngOnInit() {
    this.obtenerQuestion();
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

      this._careerService.obtenerCareer().subscribe((data: Career[]) => {
      this.careerList = data   
        
      })
    }
  

    obtenerQuestion() {
   

      this._questionService.obtenerQuestion().subscribe((data: Question[]) => {
      this.listQuestion = data.map(item => ({ ...item, actions: '' }));
      // console.log(this.listQuestion)
      
      this.dataSource = new MatTableDataSource<Question>(this.listQuestion);
      this.dataSource.paginator = this.paginator;
        
      })
    }

    deleteQuestion(id: number) {
    
      this._questionService.deleteQuestion(id).subscribe(() => {
        this.obtenerQuestion();
        this.toastr.warning('La Pregunta fue eliminada con exito', 'Pregunta eliminada');
      })
    }

    addQuestion() {

      // Validamos que el usuario ingrese valores
      if (this.nuevaQuestion == '' ) {
        this.toastr.error('Todos los campos son obligatorios', 'Error');
        return;
      }  
      // Creamos el objeto
      const question: Question = {
        descripcion: this.nuevaQuestion,
        CareerId: this.selectedCareerId
      }
  
      this._questionService.newQuestion(question).subscribe({
        next: (v) => {
         
          
          this.toastr.success(`La Pregunta ${this.nuevaQuestion} fue registrada con exito`, 'Pregunta registrada');
          this.obtenerQuestion();
         
        },
        error: (e: HttpErrorResponse) => {
                this._errorService.msjError(e);
        }
      })
    }

    updateQuestion(id: number) {
      
      if (this.updatedQuestion == '' ) {
        this.toastr.error('Todos los campos son obligatorios', 'Error');
        return;
      }

      const question: Question = {         
        descripcion: this.updatedQuestion,
        CareerId: this.selectedCareerId,
      }
       
      this._questionService.updateQuestion(id,question).subscribe(
        () => {
          this.toastr.success(`La pregunta ${this.updatedQuestion} fue actualizada con éxito`, 'pregunta actualizada');
          this.obtenerQuestion();     
        },
        (error: HttpErrorResponse) => {
          this._errorService.msjError(error);
        }
      );
    }
  


    openUpdateModal(content: any, questionId: number) {

      this.updatedQuestion = '';  
      // Buscar la carrera en la lista por el ID
      const question = this.listQuestion.find(c => c.id === questionId);
      if (question) {
      this.updatedQuestion = question.descripcion;
      this.selectedCareerId = question.CareerId;
      } 
  
     this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
          (result) => {
        
  
       this.updateQuestion(questionId);
       
  
        this.updatedQuestion = '';
            
            // Maneja el cierre del modal si es necesario
            this.closeResult = `Closed with: ${result}`;
          },
          (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
          }
        );
      
    }
    open(content:any) {
      this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then(
        (result) => {
        this.addQuestion();

        this.nuevaQuestion = '';
        this.selectedCareerId = 0;
  
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
