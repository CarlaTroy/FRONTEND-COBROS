import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { CostoProduccionDTO, CrearCostoProduccionDTO } from '../costo.produccion.model';

@Component({
  providers: [MessageService],
  selector: 'app-formulario-costo-prod',
  templateUrl: './formulario-costo-prod.component.html',
  styleUrls: ['./formulario-costo-prod.component.scss']
})
export class FormularioCostoProdComponent implements OnInit {

  submited: any = false;

  products1: CostoProduccionDTO[] = [];
  costoTotalPorActividad_Siembra: number = 0;
  costoTotalPorActividad_LaboresCulturales: number = 0;
  costoTotalPorActividad_Cosecha: number = 0;
  costoTotalProduccion: number = 0;

  

  //output
  @Output() onSubmitCanton:EventEmitter<CrearCostoProduccionDTO>=new EventEmitter<CrearCostoProduccionDTO>();
  //input
  @Input() modeloCanton!: CostoProduccionDTO;
  @Input() tipoAccion!: string;
  //formulario
  formCanton!:FormGroup;
  //
  idObtainForUpdate: string = '';

 constructor(private formBuilder: FormBuilder,
   //public dialogService: ListarRolesComponent,
   public ref: DynamicDialogRef, 
   private messageService: MessageService) { }

  ngOnInit(): void {
    this.iniciarFormulario();
      this.aplicarPatch();
  }

  aplicarPatch(){
  
    if(this.modeloCanton!=undefined || this.modeloCanton!=null){
      this.formCanton.patchValue(this.modeloCanton);
      this.costoTotalPorActividad_Siembra = Number(this.modeloCanton.siembra_total)
      this.costoTotalPorActividad_LaboresCulturales = Number(this.modeloCanton.labores_culturales_total)
      this.costoTotalPorActividad_Cosecha = Number(this.modeloCanton.cosecha_total)
      this.costoTotalProduccion = Number(this.modeloCanton.costo_total)
      let fechaObtenida: number = Number(this.modeloCanton.year)
      const fecha = new Date(fechaObtenida, 0, 1);
      
      this.formCanton.controls['year'].setValue(fecha);
    }
  }
  iniciarFormulario(){
    this.formCanton = this.formBuilder.group({
      year:['', Validators.required],

      desbroce_monte: ['', Validators.required],
      quema_maleza: ['', Validators.required],
      seleccion_semilla: ['', Validators.required],
      aplicacion_hebricida: ['', Validators.required],
      desinfeccion_semilla: ['', Validators.required],
      siembra: ['', Validators.required],
      siembra_total: ['', Validators.required],

      primera_fertilizacion: ['', Validators.required],
      primer_control_plagas: ['', Validators.required],
      primer_control_enfermedades: ['', Validators.required],
      aplicacion_herbicida: ['', Validators.required],
      segunda_fertilizacion: ['', Validators.required],
      segundo_control_plagas: ['', Validators.required],
      segundo_control_enfermedades: ['', Validators.required],
      tercera_fertilizacion: ['', Validators.required],
      tiempo_espera: ['', Validators.required],
      labores_culturales_total: ['', Validators.required],

      recolectado: ['', Validators.required],
      amontonado: ['', Validators.required],
      desgranado: ['', Validators.required],
      alquiler_desgranadora: ['', Validators.required],
      ensacado_almacenamiento: ['', Validators.required],
      control_tratamiento_maiz: ['', Validators.required],
      venta: ['', Validators.required],
      cosecha_total: ['', Validators.required],

      costo_total: ['', Validators.required],
      activo: ['true', Validators.required],
    });
  }

crearCanton():void{
  
  this.submited = true;
  if(this.formCanton.invalid){
    this.messageService.add({severity:'error', summary: 'Error', detail: 'Debe completar todos los campos'});
    return;
  }
 
  if(this.formCanton.value.year){
    this.formCanton.controls['year'].setValue(this.formCanton.value.year.getFullYear());
  }
  
  
  

  console.log(this.formCanton.value)
  //todo ok
  let instanciaCantonCrear:CrearCostoProduccionDTO=this.formCanton.value;
  this.onSubmitCanton.emit(instanciaCantonCrear);
  console.log('this.formCanton.value.year')
  console.log(this.onSubmitCanton.hasError)
  if(this.onSubmitCanton.hasError == false){
    const fecha = new Date(2023, 0, 1);
      
      this.formCanton.controls['year'].setValue(fecha);
  }

}

changeSiembra(event: any){
  let desbroceMonte: number = Number(this.formCanton.value.desbroce_monte);
  let quemaMaleza: number = Number(this.formCanton.value.quema_maleza);
  let SeleccionDeSemilla: number = Number(this.formCanton.value.seleccion_semilla);
  let AplicacionDeHerbicida: number = Number(this.formCanton.value.aplicacion_hebricida);
  let desinfeccionDeSemilla: number = Number(this.formCanton.value.desinfeccion_semilla);
  let siembra: number = Number(this.formCanton.value.siembra);
  let total: number = desbroceMonte+quemaMaleza+SeleccionDeSemilla+AplicacionDeHerbicida+desinfeccionDeSemilla+
  siembra;
  this.costoTotalPorActividad_Siembra = total;
  //this.formCanton.value.siembra_total = this.costoTotalPorActividad_Siembra;
  this.formCanton.controls['siembra_total'].setValue(this.costoTotalPorActividad_Siembra);

  console.log(total)
  this.costoTotalProduccion =this.costoTotalPorActividad_Siembra+
  this.costoTotalPorActividad_LaboresCulturales+ this.costoTotalPorActividad_Cosecha;
  this.formCanton.controls['costo_total'].setValue(this.costoTotalProduccion);
  //this.formCanton.controls['toneladas'].setValue(valorTonelada);
}

changeLaboresCulturales(event: any){
  let primeraFertilizacion: number = Number(this.formCanton.value.primera_fertilizacion);
  let primerControlDePlagas: number = Number(this.formCanton.value.primer_control_plagas);
  let primerControlDeEnfermedades: number = Number(this.formCanton.value.primer_control_enfermedades);
  let aplicacionDeHerbicida: number = Number(this.formCanton.value.aplicacion_herbicida);
  let segundaFertilizacion: number = Number(this.formCanton.value.segunda_fertilizacion);
  let segundoControlDePlagas: number = Number(this.formCanton.value.segundo_control_plagas);
  let segundoControlDeEnfermedades: number = Number(this.formCanton.value.segundo_control_enfermedades);
  let terceraFertilizacion: number = Number(this.formCanton.value.tercera_fertilizacion);
  let tiempoDeEspera: number = Number(this.formCanton.value.tiempo_espera);
  let total: number = primeraFertilizacion+primerControlDePlagas+primerControlDeEnfermedades+aplicacionDeHerbicida+
  segundaFertilizacion+segundoControlDePlagas+segundoControlDeEnfermedades+terceraFertilizacion+
  tiempoDeEspera;
  this.costoTotalPorActividad_LaboresCulturales = total;

  
  //this.formCanton.value.labores_culturales_total = this.costoTotalPorActividad_LaboresCulturales;
  this.formCanton.controls['labores_culturales_total'].setValue(this.costoTotalPorActividad_LaboresCulturales);

  console.log(total)
  this.costoTotalProduccion =this.costoTotalPorActividad_Siembra+
  this.costoTotalPorActividad_LaboresCulturales+ this.costoTotalPorActividad_Cosecha;
  this.formCanton.controls['costo_total'].setValue(this.costoTotalProduccion);
  //this.formCanton.controls['toneladas'].setValue(valorTonelada);
}


changeCosecha(event: any){
  let recolectado: number = Number(this.formCanton.value.recolectado);
  let amontonado: number = Number(this.formCanton.value.amontonado);
  let desgranado: number = Number(this.formCanton.value.desgranado);
  let alquilerDeDesgranadora: number = Number(this.formCanton.value.alquiler_desgranadora);
  let ensacado_Almacenamiento: number = Number(this.formCanton.value.ensacado_almacenamiento);
  let Control_TratamientoDeMaiz: number = Number(this.formCanton.value.control_tratamiento_maiz);
  let venta: number = Number(this.formCanton.value.venta);
  
  let total: number = recolectado+amontonado+desgranado+alquilerDeDesgranadora+
  ensacado_Almacenamiento+Control_TratamientoDeMaiz+venta;
  this.costoTotalPorActividad_Cosecha = total;

  //this.formCanton.value.cosecha_total = this.costoTotalPorActividad_Cosecha;
  this.formCanton.controls['cosecha_total'].setValue(this.costoTotalPorActividad_Cosecha);

  console.log(total)
  this.costoTotalProduccion =this.costoTotalPorActividad_Siembra+
  this.costoTotalPorActividad_LaboresCulturales+ this.costoTotalPorActividad_Cosecha;
  this.formCanton.controls['costo_total'].setValue(this.costoTotalProduccion);
  //this.formCanton.controls['toneladas'].setValue(valorTonelada);
}


printTable(){
console.log(this.formCanton.value)
}

cerrarModal(){
  //this.dialogService.cerrarModal();
  this.ref.close();
}
get year(){ return this.formCanton.get('year');}
get desbroce_monte(){ return this.formCanton.get('desbroce_monte');}
get quema_maleza(){ return this.formCanton.get('quema_maleza');}
get seleccion_semilla(){ return this.formCanton.get('seleccion_semilla');}
get aplicacion_hebricida(){ return this.formCanton.get('aplicacion_hebricida');}
get desinfeccion_semilla(){ return this.formCanton.get('desinfeccion_semilla');}
get siembra(){ return this.formCanton.get('siembra');}
get primera_fertilizacion(){ return this.formCanton.get('primera_fertilizacion');}
get primer_control_plagas(){ return this.formCanton.get('primer_control_plagas');}
get primer_control_enfermedades(){ return this.formCanton.get('primer_control_enfermedades');}
get aplicacion_herbicida(){ return this.formCanton.get('aplicacion_herbicida');}
get segunda_fertilizacion(){ return this.formCanton.get('segunda_fertilizacion');}
get segundo_control_plagas(){ return this.formCanton.get('segundo_control_plagas');}
get segundo_control_enfermedades(){ return this.formCanton.get('segundo_control_enfermedades');}
get tercera_fertilizacion(){ return this.formCanton.get('tercera_fertilizacion');}
get tiempo_espera(){ return this.formCanton.get('tiempo_espera');}
get recolectado(){ return this.formCanton.get('recolectado');}
get amontonado(){ return this.formCanton.get('amontonado');}
get desgranado(){ return this.formCanton.get('desgranado');}
get alquiler_desgranadora(){ return this.formCanton.get('alquiler_desgranadora');}
get ensacado_almacenamiento(){ return this.formCanton.get('ensacado_almacenamiento');}
get control_tratamiento_maiz(){ return this.formCanton.get('control_tratamiento_maiz');}
get venta(){ return this.formCanton.get('venta');}


}
