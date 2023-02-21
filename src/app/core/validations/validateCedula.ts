import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function validarCedula(): ValidatorFn | any{
    return (control: AbstractControl) => {
        const cedula = control.value;
        if(!cedula) return;
        if(cedula.length === 0) return;
        if (cedula.length === 10) {
                const first2Digits = cedula.substring(0, 2);
                if (parseInt(first2Digits, 10) < 25 && parseInt(first2Digits, 10) > 0) {
                    let total = 0;
                    for (let i = 0; i < 9; i++) {
                        const currD = parseInt(cedula.substring(i, i + 1), 10);
                        total += (i % 2 === 0) ? ((currD * 2 > 9) ? currD * 2 - 9 : currD * 2) : (parseInt(cedula.substring(i, i + 1), 10));
                    }
                    total = total % 10;
                    total = (total === 0) ? 0 : 10 - total;
                    if (total === parseInt(cedula.substring(cedula.length - 1, cedula.length), 10)) {
                        return;
                    }else{
                        return{
                            validateCedula:{
                                mensaje: 'Número de cédula inválido'
                            }
                        }
                    }
                }else{
                    return{
                        validateCedula:{
                            mensaje: 'Número de cédula inválido'
                        }
                    }
                }
            }else{
                return{
                    validateCedula:{
                        mensaje: 'Número de cédula inválido'
                    }
                }
            }
    return ;
    }
};
