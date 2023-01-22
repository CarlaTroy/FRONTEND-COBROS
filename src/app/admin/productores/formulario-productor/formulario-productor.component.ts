import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { LitarCantonesDTO, obtenerCantonDTO } from '../../canton/canton.model';
import { LitarParroquiasDTO, obtenerParroquiaDTO } from '../../parroquia/parroquia.model';
import { CantonService } from '../../servicios/canton.service';
import { combiarCantonParroquiaProductorDTO, CrearProductorDTO, EditProductorDTO, obtenerProductorDTO, ObtenerUnProductorDTO, ProductorDTO } from '../productor.model';
import { Subscription } from 'rxjs';
import { ParroquiaService } from '../../servicios/parroquia.service';

@Component({
  providers: [MessageService],
  selector: 'app-formulario-productor',
  templateUrl: './formulario-productor.component.html',
  styleUrls: ['./formulario-productor.component.scss']
})
export class FormularioProductorComponent implements OnInit {

  subCargarCantones!:Subscription;
  subCargarParroquias!:Subscription;

  listarCantones:LitarCantonesDTO[] = [];
  listarParroquias:LitarParroquiasDTO[] = [];
  //variables globales
  loading:boolean=false;
  loadingParroquia:boolean=false;
  
  submited: any = false;

  fk_canton_id_Form: any
  fk_parroquia_id_Form: any
 
  cedulaValidadaConExito?: boolean;

  cantones: obtenerCantonDTO[];
  parroquias: obtenerParroquiaDTO[];
  selectedCity1!: obtenerProductorDTO;
   //output
   @Output() onSubmitProductor:EventEmitter<CrearProductorDTO>=new EventEmitter<CrearProductorDTO>();
   //input
   @Input() modeloProductor!: EditProductorDTO;
   @Input() modeloUnaProductor!: ObtenerUnProductorDTO;
   //@Input() objCombinacion!: combiarCantonParroquiaProductorDTO;
   @Input() tipoAccion!: string;
   //formulario
   formProductor!:FormGroup;
   
   //
   idObtainForUpdate: string = '';
  constructor(private parroquiaService:ParroquiaService,
    private cantonService:CantonService, 
    private formBuilder: FormBuilder,
    //public dialogService: ListarRolesComponent,
     public ref: DynamicDialogRef,
    private messageService: MessageService) {
      this.cantones = [];
      this.parroquias = [];
     }

  ngOnInit(): void {
    this.cargarCantones()
    this.cargarParroquias()
    this.iniciarFormulario();
    this.aplicarPatch()

  
  }

  aplicarPatch(){

    console.log('aplicando patch')
    console.log(this.modeloUnaProductor)

    if(this.modeloUnaProductor != undefined || this.modeloUnaProductor!=null){
      
      //console.log(this.modeloUnaProductor)

      this.modeloProductor = {
        id: this.modeloUnaProductor.id,
        nombre: this.modeloUnaProductor.nombre,
        apellido: this.modeloUnaProductor.apellido,
        cedula: this.modeloUnaProductor.cedula,
        celular: this.modeloUnaProductor.celular,
        fk_canton_id: this.modeloUnaProductor.fk_canton.id,
        fk_parroquia_id: this.modeloUnaProductor.fk_canton.id,
        activo: this.modeloUnaProductor.activo,
      }

     
      
      
    }


    if(this.modeloProductor!=undefined || this.modeloProductor!=null){
      if(this.validarcedula(this.modeloProductor.cedula)){
        this.cedulaValidadaConExito = true
      }
      this.formProductor.patchValue(this.modeloProductor);
      
      
      setTimeout(() => {

        for (let i = 0; i < this.listarCantones.length; i++) {
          if(this.listarCantones[i].id === this.modeloUnaProductor.fk_canton.id){
            if(this.cantones[i].name === this.modeloUnaProductor.fk_canton.nombre){
              this.cantones.splice(i,1)
              this.cantones.unshift({name: this.listarCantones[i].nombre, id: this.listarCantones[i].id})
              console.log(this.formProductor.value.fk_canton_id)
              //this.formProductor.value.fk_canton_id = Number(this.listarCantones[i].id)
              this.fk_canton_id_Form = this.listarCantones[i].id
              this.formProductor.controls['fk_canton_id'].setValue(Number(this.listarCantones[i].id));
            }
          }
          
        }

        for (let i = 0; i < this.listarParroquias.length; i++) {
          let mapa = {id: this.listarParroquias[i].id,name: this.listarParroquias[i].nombre}
          this.parroquias.push(mapa)

          if(this.listarParroquias[i].id === this.modeloUnaProductor.fk_parroquia.id){
            if(this.parroquias[i].name === this.modeloUnaProductor.fk_parroquia.nombre){
              this.parroquias.splice(i,1)
              this.parroquias.unshift({name: this.listarParroquias[i].nombre, id: this.listarParroquias[i].id})
              console.log(this.formProductor.value.fk_parroquia_id)
              //this.formProductor.value.fk_canton_id = Number(this.listarCantones[i].id)
              this.fk_parroquia_id_Form = this.listarParroquias[i].id
              this.formProductor.controls['fk_parroquia_id'].setValue(Number(this.listarParroquias[i].id));
            }
          }
          
        }
        
        /*let newItems = this.listarCantones.filter((item)=> item.id === this.modeloProductor.fk_canton_id);
        console.log(newItems)

        let newItem = this.listarCantones.map(item => item.nombre);
        console.log(newItem)*/
      }, 1000);
      
    }
  }
  iniciarFormulario(){
    this.formProductor = this.formBuilder.group({
      nombre: ['',[Validators.required, Validators.maxLength(250)]],
      apellido: ['', [Validators.required, Validators.maxLength(250)]],
      cedula: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      celular: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(15)]],
      activo: [true, Validators.required],
      fk_canton_id: ['', [Validators.required]],
      fk_parroquia_id: ['', [Validators.required]],
    });
  }

crearProductor():void{
  this.submited = true;
  
  if(this.formProductor.value.cedula != undefined){

    this.validarcedula(this.formProductor.get('cedula'))
  }
  if(this.formProductor.invalid && !this.cedulaValidadaConExito){
    this.messageService.add({severity:'error', summary: 'Error', detail: 'Debe completar todos los campos'});
    return;
  }
  //todo ok
  //console.log(this.formProductor.value.fk_canton)
  //console.log(this.listarCantones)
  /*for (let i = 0; i < this.listarCantones.length; i++) {
    
    if(this.listarCantones[i].nombre == this.formProductor.value.fk_canton_id.name){
      this.formProductor.value.fk_canton_id = Number(this.listarCantones[i].id)
      //console.log(this.formProductor.value.fk_canton)
    }
  }*/
  this.formProductor.controls['nombre'].setValue(this.formProductor.value.nombre.toUpperCase());
  this.formProductor.controls['apellido'].setValue(this.formProductor.value.apellido.toUpperCase());

  this.formProductor.value.fk_canton_id = Number(this.fk_canton_id_Form)
  this.formProductor.value.fk_parroquia_id = Number(this.fk_parroquia_id_Form)

  console.log(this.formProductor.value)
  
  let instanciaProductorCrear:CrearProductorDTO=this.formProductor.value;
  this.onSubmitProductor.emit(instanciaProductorCrear);

}

cerrarModal(){
  //this.dialogService.cerrarModal();
  this.ref.close();
}

cargarCantones():void{
  this.subCargarCantones=this.cantonService.obtenerTodos().subscribe(cantones=>{
    //console.log(cantones.data);
    this.loading=false;
    this.listarCantones=cantones.data;
    for (let i = 0; i < cantones.data.length; i++) {
      let mapa = {id: cantones.data[i].id,name: cantones.data[i].nombre}
      this.cantones.push(mapa)
      }
  },error=>{
    console.log(error);
    this.messageService.add({severity:'error', summary: 'Error', detail: 'Error vuelva a recargar la página'});
  });

}

onChangeCanton(event: any) {
  
  if(!event.value) return
  //console.log(event.value)
  this.parroquias = []
  for (let i = 0; i < this.listarParroquias.length; i++) {
    if(this.listarParroquias[i].fk_canton.id === event.value['id']){
      let mapa = {id: this.listarParroquias[i].id,name: this.listarParroquias[i].nombre}
      
      this.parroquias.push(mapa)

    }    
  }
  console.log(this.formProductor.value.fk_canton_id.id)
  this.fk_canton_id_Form = event.value['id']
  this.formProductor.value.fk_canton_id.id = Number(event.value['id'])
}

cargarParroquias():void{
  this.subCargarParroquias=this.parroquiaService.obtenerTodos().subscribe(parroquias=>{
    //console.log(parroquias.data);
    this.loadingParroquia=false;
    
    this.listarParroquias=parroquias.data;

    /*for (let i = 0; i < parroquias.length; i++) {
      let mapa = {id: parroquias[i].id,name: parroquias[i].nombre}
      
      this.parroquias = [mapa, ...this.parroquias]
      }*/
      

  },error=>{
    console.log(error);
    this.messageService.add({severity:'error', summary: 'Error', detail: 'Error vuelva a recargar la página'});
  });
}

onChangeParroquia(event: any) {
  if(!event.value) return
  console.log(event.value['id']);
  this.fk_parroquia_id_Form = event.value['id']
  this.formProductor.value.fk_parroquia_id.id = Number(event.value['id'])
}


 validarcedula(cedula: any) {

  if(cedula.value === undefined){
    cedula = cedula;
    console.log(cedula)
  }else{
    cedula = cedula.value
    console.log(cedula)
  }
  
  if (cedula.length !== 10) {
    // Las cédulas ecuatorianas tienen 10 dígitos
    return false;
  }
  // Verificar que todos los dígitos sean numéricos
  if (/^\d+$/.test(cedula) === false) {
    return false;
  }
  // Verificar que el primer dígito sea 0, 1, 2, 3, 4, 5, 6, 7, 8 o 9
  if (/^[0-9]/.test(cedula) === false) {
    return false;
  }
  // Verificar que el segundo dígito sea 0, 1, 2, 3, 4, 5, 6, 7, 8 o 9
  if (/^[0-9].*[0-9]$/.test(cedula) === false) {
    return false;
  }
  // Verificar que el tercer dígito sea 0, 1, 2, 3, 4, 5, 6, 7, 8 o 9
  if (/^[0-9].*[0-9].*[0-9]$/.test(cedula) === false) {
    return false;
  }
  // Verificar que el cuarto dígito sea 6, 7, 8 o 9
  if (/^[0-9].*[0-9].*[0-9].*[6-9]$/.test(cedula) === false) {
    return false;
  }
  // Si se ha llegado hasta aquí, la cédula es válida
  return true;
}
/*validarcedula(cedula: any) {
  
  
  if(cedula.value === undefined){
    cedula = cedula;
    console.log(cedula)
  }else{
    cedula = cedula.value
    console.log(cedula)
  }

  //Preguntamos si la cedula consta de 10 digitos
  if (cedula.length === 10) {

    //Obtenemos el digito de la region que sonlos dos primeros digitos
    var digito_region = cedula.substring(0, 2);

    //Pregunto si la region existe ecuador se divide en 24 regiones
    if (digito_region >= 1 && digito_region <= 24) {

      // Extraigo el ultimo digito
      var ultimo_digito = parseInt(cedula.substring(9, 10));

      //Agrupo todos los pares y los sumo
      var pares = parseInt(cedula.substring(1, 2)) + parseInt(cedula.substring(3, 4)) + parseInt(cedula.substring(5, 6)) + parseInt(cedula.substring(7, 8));

      //Agrupo los impares, los multiplico por un factor de 2, si la resultante es > que 9 le restamos el 9 a la resultante
      var numero1 = cedula.substring(0, 1);
      numero1 = (numero1 * 2);
      if (numero1 > 9) { numero1 = (numero1 - 9); }

      var numero3 = cedula.substring(2, 3);
      numero3 = (numero3 * 2);
      if (numero3 > 9) { numero3 = (numero3 - 9); }

      var numero5 = cedula.substring(4, 5);
      numero5 = (numero5 * 2);
      if (numero5 > 9) { numero5 = (numero5 - 9); }

      var numero7 = cedula.substring(6, 7);
      numero7 = (numero7 * 2);
      if (numero7 > 9) { numero7 = (numero7 - 9); }

      var numero9 = cedula.substring(8, 9);
      numero9 = (numero9 * 2);
      if (numero9 > 9) { numero9 = (numero9 - 9); }

      var impares = numero1 + numero3 + numero5 + numero7 + numero9;

      //Suma total
      var suma_total = (pares + impares);

      //extraemos el primero digito
      var primer_digito_suma = String(suma_total).substring(0, 1);

      //Obtenemos la decena inmediata
      var decena = (parseInt(primer_digito_suma) + 1) * 10;

      //Obtenemos la resta de la decena inmediata - la suma_total esto nos da el digito validador
      var digito_validador = decena - suma_total;

      //Si el digito validador es = a 10 toma el valor de 0
      if (digito_validador === 10) {
        digito_validador = 0;
      }
      //Validamos que el digito validador sea igual al de la cedula
      if (digito_validador === ultimo_digito) {
        //console.log('ok')
        this.cedulaValidadaConExito = true;
        return true
      } else {
        //console.log('NO ok')
        console.log(cedula)
        if(cedula){
          this.messageService.add({severity:'error', summary: 'Error', detail: 'La cédula no es correcta'});
        }

        this.cedulaValidadaConExito = false;
        return false
      }

    } else {
      if(cedula){
        this.messageService.add({severity:'error', summary: 'Error', detail: 'La cédula no es correcta'});
      }
      this.cedulaValidadaConExito = false;
      //console.log('NO ok')
      // imprimimos en consola si la region no pertenece
      return false
    }
  } else {
    //imprimimos en consola si la cedula tiene mas o menos de 10 digitos
    if(cedula){
      this.messageService.add({severity:'error', summary: 'Error', detail: 'La cédula no es correcta'});
    }
    return false
  }
}*/
ngOnDestroy(): void {
  if(this.subCargarParroquias){
    this.subCargarParroquias.unsubscribe();
  }
  if(this.subCargarCantones){
    this.subCargarCantones.unsubscribe();
  }

  if (this.ref) {
    this.ref.close();
  }
}

get nombre(){ return this.formProductor.get('nombre');}
get apellido(){ return this.formProductor.get('apellido');}
get cedula(){ return this.formProductor.get('cedula');}
get celular(){ return this.formProductor.get('celular');}
get fk_canton_id(){ return this.formProductor.get('fk_canton_id');}
get fk_parroquia_id(){ return this.formProductor.get('fk_parroquia_id');}
}
