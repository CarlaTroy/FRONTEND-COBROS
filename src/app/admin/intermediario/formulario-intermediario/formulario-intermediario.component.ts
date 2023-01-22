import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { CrearIntermediarioDTO, IntermediarioDTO } from '../intermediario.model';



@Component({
  providers: [MessageService],
  selector: 'app-formulario-intermediario',
  templateUrl: './formulario-intermediario.component.html',
  styleUrls: ['./formulario-intermediario.component.scss']
})
export class FormularioIntermediarioComponent implements OnInit {

  //output
  @Output() onSubmitIntermediario:EventEmitter<CrearIntermediarioDTO>=new EventEmitter<CrearIntermediarioDTO>();
  //input
  @Input() modeloIntermediario!: IntermediarioDTO;
  @Input() tipoAccion!: string;
  //formulario
  formIntermediario!:FormGroup;
  //
  idObtainForUpdate: string = '';
  submited: any = false;

 constructor(private formBuilder: FormBuilder,
   //public dialogService: ListarRolesComponent,
   public ref: DynamicDialogRef, 
   private messageService: MessageService) { }


  ngOnInit(): void {

    this.iniciarFormulario();
    this.aplicarPatch()

  }

  aplicarPatch(){
    if(this.modeloIntermediario!=undefined || this.modeloIntermediario!=null){
      this.formIntermediario.patchValue(this.modeloIntermediario);
      

    }
  }
  iniciarFormulario(){
    this.formIntermediario = this.formBuilder.group({
      lugar: ['', Validators.required],
      activo: ['true', Validators.required],
    });
  }


  crearLugar():void{
    this.submited = true;
    if(this.formIntermediario.invalid){
      this.messageService.add({severity:'error', summary: 'Error', detail: 'Debe completar todos los campos'});
      return;
    }

    this.formIntermediario.controls['lugar'].setValue(this.formIntermediario.value.lugar.toUpperCase());
    console.log(this.formIntermediario.value.nombre)
    //todo ok
    let instanciaLugarCrear:CrearIntermediarioDTO=this.formIntermediario.value;
    this.onSubmitIntermediario.emit(instanciaLugarCrear);

  }

  cerrarModal(){
    //this.dialogService.cerrarModal();
    this.ref.close();
  }

  get nombre(){ return this.formIntermediario.get('nombre');}

}
