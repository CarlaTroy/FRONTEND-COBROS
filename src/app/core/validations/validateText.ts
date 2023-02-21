export function soloLetras(e:any):any {
  let caracter=e.key;
  let caracterValido=/^[a-zA-ZáéíóúñÁÉÍÓÚÑ]+$/.test(caracter);
  if(caracterValido){
    return true;
  }
  return false;

}
