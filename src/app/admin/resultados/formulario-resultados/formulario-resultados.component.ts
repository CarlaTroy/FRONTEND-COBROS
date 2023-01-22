import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { CrearResultadoDTO, ObtenerResultadoCompletoDTO, ResultadoDTO } from '../resultados.model';
import { ResultadosService } from '../../servicios/resultados.service';

@Component({
  providers: [MessageService],
  selector: 'app-formulario-resultados',
  templateUrl: './formulario-resultados.component.html',
  styleUrls: ['./formulario-resultados.component.scss']
})
export class FormularioResultadosComponent implements OnInit {

  submited: any = false;
  
  //output
  @Output() onSubmitResultado:EventEmitter<CrearResultadoDTO>=new EventEmitter<CrearResultadoDTO>();
  //input
  @Input() modeloResultado!: ResultadoDTO;
  @Input() tipoAccion!: string;
  //formulario
  formResultado!:FormGroup;

  //listarResultadoYear!:ResultadoCompletoDTO;
  modeloResultadoYear!: ObtenerResultadoCompletoDTO;
  //
  idObtainForUpdate: string = '';


  numeroHectarias: number = 0;
  costoTotalProduccionPorHectaria: number = 0;
  precioVentaAlMercado: number = 0;
  rendimientoCultivo: number = 0;



 constructor(private formBuilder: FormBuilder,
   //public dialogService: ListarRolesComponent,
   public ref: DynamicDialogRef, 
   private messageService: MessageService,
   private resultadoService: ResultadosService) { }


  ngOnInit(): void {
    this.iniciarFormulario();
    this.aplicarPatch();
  }


  aplicarPatch(){
    if(this.modeloResultado!=undefined || this.modeloResultado!=null){
      this.formResultado.patchValue(this.modeloResultado);
      
      let fechaObtenida: number = Number(this.modeloResultado.year)
      const fecha = new Date(fechaObtenida, 0, 1);
      
      this.formResultado.controls['year'].setValue(fecha);


      let instanciaResultadoCrear:ObtenerResultadoCompletoDTO = {
        year: this.formResultado.value.year.getFullYear().toString()
      }
      this.obtenerResultadoCompletoYear(instanciaResultadoCrear)

    }
  }
  iniciarFormulario(){
    this.formResultado = this.formBuilder.group({
      year: ['', Validators.required],
      costo_total_produccion: ['', Validators.required],
      rentabilidad: ['', Validators.required],
      numeroHectarias: [''],
      costoTotalProduccionPorHectaria: [''],
      precioVentaAlMercado: [''],
      rendimientoCultivo: [''],
    });
  }

crearResultado():void{
  this.submited = true;
  if(this.formResultado.invalid){
    this.messageService.add({severity:'error', summary: 'Error', detail: 'Debe completar todos los campos'});
    return;
  }

  console.log(this.formResultado.value.nombre)
  console.log(this.formResultado.value.latitud)
  console.log(this.formResultado.value.longitud)
  //todo ok

  if(this.formResultado.value.year){
    this.formResultado.controls['year'].setValue(this.formResultado.value.year.getFullYear());
  }

  let instanciaResultadoCrear:CrearResultadoDTO={
    year: this.formResultado.value.year.toString(),
    costo_total_produccion: this.formResultado.value.costo_total_produccion,
    rentabilidad: this.formResultado.value.rentabilidad
  };
  this.onSubmitResultado.emit(instanciaResultadoCrear);


  if(this.onSubmitResultado.hasError == false){
    const fecha = new Date(2023, 0, 1);
      
      this.formResultado.controls['year'].setValue(fecha);
  }

}

fechaElegida(){
  //console.log(this.formResultado.value.year.getFullYear())
  this.modeloResultadoYear = {
    year: this.formResultado.value.year.getFullYear().toString()
  }
  console.log(this.modeloResultadoYear)
  this.obtenerResultadoCompletoYear(this.modeloResultadoYear)
}

obtenerResultadoCompletoYear(crearResultadoYear: ObtenerResultadoCompletoDTO){
  this.resultadoService.obtenerTotalProduccionParaResultados(crearResultadoYear).subscribe( 
    (response: any) => {
      console.log('response');
      console.log(response.data);
      //this.listarResultadoYear = response.data
      this.costoTotalProduccionPorHectaria = response.data.costoTotalProduccion.costoTotalProduccionPorHectaria;
      this.formResultado.controls['costoTotalProduccionPorHectaria'].setValue(this.costoTotalProduccionPorHectaria);
      
      this.numeroHectarias= response.data.costoTotalProduccion.numeroHectarias;
      this.formResultado.controls['numeroHectarias'].setValue(this.numeroHectarias);

      let resultCostoTotalProduccion = Number(this.costoTotalProduccionPorHectaria)*Number(this.numeroHectarias);
      this.formResultado.controls['costo_total_produccion'].setValue(resultCostoTotalProduccion);



      
      this.precioVentaAlMercado = response.data.rentabilidad.precioVentaAlMercado;
      this.formResultado.controls['precioVentaAlMercado'].setValue(this.precioVentaAlMercado);
      
      this.rendimientoCultivo = response.data.rentabilidad.rendimientoCultivo;
      this.formResultado.controls['rendimientoCultivo'].setValue(this.rendimientoCultivo);


      let resultRentabilidad = Number(this.precioVentaAlMercado)*Number(this.rendimientoCultivo);
      this.formResultado.controls['rentabilidad'].setValue(resultRentabilidad);



      },
      (error: any) => {
        console.log('error')
        console.log(error.error.message)
        let message= error.error.message;
        this.messageService.add({severity:'error', summary: 'Error', detail: message});
        }
    );
}

cerrarModal(){
  //this.dialogService.cerrarModal();
  this.ref.close();
}

get year(){ return this.formResultado.get('year');}
get costo_total_produccion(){ return this.formResultado.get('costo_total_produccion');}
get rentabilidad(){ return this.formResultado.get('rentabilidad');}
get numeroHectariasForm(){ return this.formResultado.get('numeroHectarias');}
get costoTotalProduccionPorHectariaForm(){ return this.formResultado.get('costoTotalProduccionPorHectaria');}
get precioVentaAlMercadoForm(){ return this.formResultado.get('precioVentaAlMercado');}
get rendimientoCultivoForm(){ return this.formResultado.get('rendimientoCultivo');}

}