import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
export function validateDecimalesEnteros(e:any) {
    let caracter=e;
    let caracterValido=/^-?\d+(\.\d+)?$/.test(caracter);
    if(caracterValido){
      return true;
    }
    return false;
}
