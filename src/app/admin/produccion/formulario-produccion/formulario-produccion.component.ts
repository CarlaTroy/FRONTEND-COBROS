import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { CrearProduccionDTO, EditProduccionDTO, ProduccionDTO } from '../produccion.model';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { LitarProductoresDTO, ProductorDTO } from '../../productores/productor.model';
import { ProductorService } from '../../servicios/productor.service';
import { TipoProductorDTO } from '../../productores/tipo.producto';


@Component({
  providers: [MessageService],
  selector: 'app-formulario-produccion',
  templateUrl: './formulario-produccion.component.html',
  styleUrls: ['./formulario-produccion.component.scss']
})
export class FormularioProduccionComponent implements OnInit {


  subCargarProductores!:Subscription;
  listarProductores:LitarProductoresDTO[] = [];
  listarTiposDeProductores:TipoProductorDTO[] = [];
  selectedCustomer!: ProductorDTO;
  loading:boolean=false;
  selectedTipoDeProduccion!: string;
  productorSeleccionado: boolean = false;

  
  
   //output
   @Output() onSubmitProduccion:EventEmitter<CrearProduccionDTO>=new EventEmitter<CrearProduccionDTO>();
   //input
   @Input() modeloProduccion!: EditProduccionDTO;
   @Input() modeloUnProduccion!: ProduccionDTO;
   @Input() tipoAccion!: string;
   //formulario
   formProduccion!:FormGroup;
   //
   cantones = ['1'];
   selectedCity1 = '1';
   
   idObtainForUpdate: string = '';
   tipoProductorSelected!: number;
   productorSelected!: number;
   submited: any = false;

  constructor(private formBuilder: FormBuilder,
    //public dialogService: ListarRolesComponent,
    public ref: DynamicDialogRef, 
    private productorService:ProductorService,
    private messageService: MessageService) { }

  ngOnInit(): void {

    this.iniciarFormulario();
    this.cargarTiposDeProductores()
      this.aplicarPatch();

      if(this.tipoProductorSelected){
        setTimeout(() => {
          console.log(this.tipoProductorSelected.toString())
          console.log(this.listarTiposDeProductores)
          for (let i = 0; i < this.listarTiposDeProductores.length; i++) {
            if(Number(this.listarTiposDeProductores[i].id) === this.tipoProductorSelected){
              this.selectedTipoDeProduccion = this.listarTiposDeProductores[i].nombre
              this.tipoProductorSelected = Number(this.listarTiposDeProductores[i].id)
              this.formProduccion.controls['fk_tipo_productor_id'].setValue(this.selectedTipoDeProduccion);
            }
            
          }
        }, 1000);
      }
  }

  aplicarPatch(){

    if(this.modeloUnProduccion != undefined)
    {
      this.modeloProduccion = {
        id: this.modeloUnProduccion.id,
        year: this.modeloUnProduccion.year,
        hectareas: this.modeloUnProduccion.hectareas,
        precio_venta: this.modeloUnProduccion.precio_venta,
        toneladas: this.modeloUnProduccion.toneladas,
        quintales: this.modeloUnProduccion.quintales,
        activo: this.modeloUnProduccion.activo,
        fk_tipo_productor_id: this.modeloUnProduccion.fk_tipo_productor.id,
        fk_productor_id: this.modeloUnProduccion.fk_productor.id,
      }
    }
    


    if(this.modeloProduccion!=undefined || this.modeloProduccion!=null){
      this.formProduccion.patchValue(this.modeloProduccion);
      
      this.tipoProductorSelected = Number(this.modeloProduccion.fk_tipo_productor_id);
      this.productorSelected = this.modeloProduccion.fk_productor_id;

      let fechaObtenida: number = Number(this.modeloProduccion.year)
      const fecha = new Date(fechaObtenida, 0, 1);
      
      this.formProduccion.controls['year'].setValue(fecha);
     

      this.productorSeleccionado = true;


      setTimeout(() => {
        this.productorService.obtenerProductorPorId(this.modeloUnProduccion.fk_productor.id).subscribe(productor =>{
          console.log('produccion')
          console.log(productor)
          this.selectedCustomer = productor.data
        })
      }, 1000);


    }
  }
  iniciarFormulario(){
    this.formProduccion = this.formBuilder.group({
      year: ['', [Validators.required,]],
      hectareas: ['', Validators.required],
      precio_venta: ['', Validators.required],
      toneladas: ['', Validators.required],
      quintales: ['', Validators.required],
      activo: ['true', Validators.required],
      fk_tipo_productor_id: ['', Validators.required],
      fk_productor_id: [''],
    });
  }


crearProduccion():void{
  this.submited = true;
  if(this.formProduccion.invalid){
    this.messageService.add({severity:'error', summary: 'Error', detail: 'Debe completar todos los campos'});
    return;
  }
  //todo ok

  if(this.formProduccion.value.year){
    this.formProduccion.controls['year'].setValue(this.formProduccion.value.year.getFullYear());
  }

  this.formProduccion.value.fk_tipo_productor_id = this.tipoProductorSelected
  this.formProduccion.value.fk_productor_id = this.productorSelected
  let instanciaCantonCrear:CrearProduccionDTO=this.formProduccion.value;
  this.onSubmitProduccion.emit(instanciaCantonCrear);

  if(this.onSubmitProduccion.hasError == false){
    const fecha = new Date(2023, 0, 1);
      
      this.formProduccion.controls['year'].setValue(fecha);
  }

}

cerrarModal(){
  //this.dialogService.cerrarModal();
  this.ref.close();
}


display: boolean = false;

showDialog() {
  this.cargarProductores()
    this.display = true;
}


cargarTiposDeProductores():void{
  //this.listaPresentarDatosProductor = []
  this.subCargarProductores=this.productorService.obtenerTodosTiposDeProductores().subscribe(productores=>{
    console.log(productores.data);
    this.loading=false;
    this.listarTiposDeProductores=productores.data;
    //this.combinarCantonProductores()
    

  },error=>{
    console.log(error);
    this.messageService.add({severity:'error', summary: 'Error', detail: 'Error vuelva a recargar la página'});
  });

}

changeQuintalesToneladas(event: any){
  let valorQuintales = this.formProduccion.value.quintales;
  let valorTonelada = valorQuintales/22;
  this.formProduccion.controls['toneladas'].setValue(valorTonelada.toFixed(2));
}

changeTipoProduccion(event: any){
  let valorHectareas: number = this.formProduccion.value.hectareas;

  console.log('this.listarTiposDeProductores')
  console.log(this.listarTiposDeProductores)
  
  for (let i = 0; i < this.listarTiposDeProductores.length; i++) {

    if(valorHectareas <= 5 && this.listarTiposDeProductores[i].nombre.toLowerCase()=== 'pequeño'){
      this.selectedTipoDeProduccion = this.listarTiposDeProductores[i].nombre
      this.tipoProductorSelected = Number(this.listarTiposDeProductores[i].id)
      this.formProduccion.controls['fk_tipo_productor_id'].setValue(this.selectedTipoDeProduccion);
    }
    if(valorHectareas >= 5 && valorHectareas<=10 && this.listarTiposDeProductores[i].nombre.toLowerCase()=== 'mediano'){
      this.selectedTipoDeProduccion = this.listarTiposDeProductores[i].nombre
      this.tipoProductorSelected = Number(this.listarTiposDeProductores[i].id)
      this.formProduccion.controls['fk_tipo_productor_id'].setValue(this.selectedTipoDeProduccion);
    }
    if(valorHectareas >= 10 && this.listarTiposDeProductores[i].nombre.toLowerCase()=== 'grande'){
      this.selectedTipoDeProduccion = this.listarTiposDeProductores[i].nombre
      this.tipoProductorSelected = Number(this.listarTiposDeProductores[i].id)
      this.formProduccion.controls['fk_tipo_productor_id'].setValue(this.selectedTipoDeProduccion);
    }

  }


  
}


cargarProductores():void{
  //this.listaPresentarDatosProductor = []
  this.subCargarProductores=this.productorService.obtenerTodos().subscribe(productores=>{
    //console.log(productores.data);
    this.loading=false;
    this.listarProductores=productores.data;
    //this.combinarCantonProductores()
    

  },error=>{
    console.log(error);
    this.messageService.add({severity:'error', summary: 'Error', detail: 'Error vuelva a recargar la página'});
  });

}

btnSeleccionarroductor(productor:ProductorDTO){
console.log(productor)
this.selectedCustomer = productor
this.productorSelected = productor.id
this.productorSeleccionado = true;
this.display = false;
}

get year(){ return this.formProduccion.get('year');}
get hectareas(){ return this.formProduccion.get('hectareas');}
get precio_venta(){ return this.formProduccion.get('precio_venta');}
get toneladas(){ return this.formProduccion.get('toneladas');}
get quintales(){ return this.formProduccion.get('quintales');}
get activo(){ return this.formProduccion.get('activo');}
get fk_tipo_productor_id(){ return this.formProduccion.get('fk_tipo_productor_id');}
get fk_productor_id(){ return this.formProduccion.get('fk_productor_id');}
}
