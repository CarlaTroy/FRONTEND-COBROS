import { Component, OnInit } from '@angular/core';
import { validarCedula } from 'src/app/core/validations/validateCedula';
import { validateDecimalesEnteros } from 'src/app/core/validations/validateDecimalesEnteros';
import { soloNumeros } from 'src/app/core/validations/validateNumero';
import { soloLetras } from 'src/app/core/validations/validateText';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  validateText(e:any){
    return soloLetras(e);
  }
  
  validateNumero(e:any){
    return soloNumeros(e);
  }

  validateDecimalesEnteros(e:any){
    return validateDecimalesEnteros(e);
  }

  validateCedula(){
    validarCedula();
  }

}


