import { Component, OnInit, ViewChild  } from '@angular/core';
import { Router } from '@angular/router';
import { Question } from '../../interfaces/question';
import { QuestionService } from '../../servicios/question.service';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from 'src/app/servicios/error_service';
import { AnswerService } from '../../servicios/answer.service';
import { Answer } from '../../interfaces/answer';
import jwt_decode from 'jwt-decode';
import { ReportesService } from '../../servicios/reportes.service';
import { Reporte } from '../../interfaces/reporteUser';




@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  @ViewChild('contentUpdate') contentUpdate: any;

  closeResult!: string;
  listQuestion: Question[] = [];
  listAnswer: Answer[] = [];
  listReporte: Reporte[] = [];
  public showWarning: boolean = false;

  ngOnInit() {

    this. obtenerReportes();
  
  }

  constructor(
    private toastr: ToastrService, 
    private router: Router, 
    private _questionService: QuestionService,
    private modalService: NgbModal,
    private _errorService: ErrorService,
    private _answerService: AnswerService,
    private _reportesService: ReportesService ) { }

    obtenerAnswer() {  

    this._questionService.obtenerQuestion().subscribe((data: Question[]) => {
    this.listQuestion = data 
      
    })
  }

    agregarAnswer() {
    
    const id = this.obtenerId();

    const todasRespondidas = this.listQuestion.every(pregunta => pregunta.respuesta !== undefined);

    if (!todasRespondidas) {
      this.toastr.error('Por favor, llene todo los campos', 'Error');
      return;
    }
   
    else{

      for (const pregunta of this.listQuestion) {

      if(pregunta.respuesta !== undefined && pregunta.id !== undefined){
      const answer: Answer = {
        valor: pregunta.respuesta, // Obtén el valor de la pregunta desde tu modelo de datos
        UserId: id, // Establece el valor correcto del usuario
        QuestionId: pregunta.id,// Obtén el ID de la pregunta desde tu modelo de datos
      };   

      this._answerService.newAnswer(answer).subscribe(
        () => {
          // Respuesta enviada con éxito
          this.toastr.success('Las respuestas se agregaron con exito', 'Respuesta Agregada');
          
        },
        (error: HttpErrorResponse) => {
          // Error al enviar la respuesta
          this._errorService.msjError(error);
        }
      );
     }
    }
    this.listQuestion = [];
    this.obtenerReportes();
    }
    
    
  }
    obtenerId() {
      const token = localStorage.getItem('token') ?? '';    
      const decodedToken: any = jwt_decode(token);
      const usuario = decodedToken.id;
      return usuario
  }
  obtenerReportes() {     
    const id = this.obtenerId();
    this._reportesService.obtenerIdAfinidad(id).subscribe((data: Reporte[]) => {
      this.listReporte = data;
      const isEmpty = Object.keys(data).length === 0; 
      if (isEmpty) {
        this.obtenerAnswer();
      } else {      
        this.showWarning = true;
        this.openUpdateModal(this.contentUpdate)

      }   
    });
  }
  
  redireccionar() {
      
    this.router.navigate(['/dashboardUser/reportesId']);
  }

  openUpdateModal(content: any) {

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
       (result) => {
        
        this.redireccionar();
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
