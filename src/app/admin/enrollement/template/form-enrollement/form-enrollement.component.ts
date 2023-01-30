import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CourseFullDTO } from 'src/app/admin/course/course';
import { StudentFullDTO } from 'src/app/admin/student/student';
import Swal from 'sweetalert2';
import {
    CuotasPaymentTableDTO,
    EnrollementCreateDTO,
    EnrollementFullDTO,
    TypePaysFullDTO,
} from '../../enrollement';
import { EnrollementService } from 'src/app/admin/servicios/enrollement.service';
import { MessageService } from 'primeng/api';
import { CohorteFullDTO } from 'src/app/admin/cohorte/cohorte';
import * as moment from 'moment';
@Component({
    providers: [MessageService],
    selector: 'app-form-enrollement',
    templateUrl: './form-enrollement.component.html',
    styleUrls: ['./form-enrollement.component.scss'],
})
export class FormEnrollementComponent implements OnInit {
    @Input() modeForm!: string;
    @Input() modelStudentFull!: StudentFullDTO[];
    @Input() modelCohorteFull!: CohorteFullDTO[];
    @Input() modelTypePaysFull!: TypePaysFullDTO[];
    @Input() modelCohorteseFull!: EnrollementFullDTO;

    selectedStudent!: StudentFullDTO;
    selectedCohorte!: CohorteFullDTO;

    studentIdSelected!: number;
    studentNameSelected: string = '';

    typePayIdSelected!: number;
    typePayNameSelected: string = '';
    typePayCodeSelected: string = '';

    display: boolean = false;
    displayCohorte: boolean = false;

    loading: boolean = false;
    loadingCohorte: boolean = false;
    studentSelectedForViewData: boolean = true;
    cohorteSelectedForViewData: boolean = true;

    activateFieldCash: boolean = false;
    activateFieldCuotas: boolean = false;
    activeDayLimite:boolean=false;

    priceEffectiveOfCourse:number = 0;
    priceCuotasOfCourse:number = 0;
    valRealPayment:number=0;


    //output
    @Output() onSubmitCohorte: EventEmitter<EnrollementCreateDTO> =
        new EventEmitter<EnrollementCreateDTO>();
    //form
    formCohorte!: FormGroup;
    //toast
    Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
        },
    });
    //suscription
    sub!: Subscription;
    //global var
    intanceCourse!: CourseFullDTO;
    arrayCuotasPaymet!:CuotasPaymentTableDTO[];
    filterValue = '';
    constructor(
        private formBuilder: FormBuilder,
        public messageService: MessageService,
        private enrollementService: EnrollementService
    ) {}

    showDialog() {
        this.display = true;
    }

    showDialogCohorte() {
        this.displayCohorte = true;
    }

    ngOnInit(): void {

        this.initInputForm();
        this.formCohorte.get("tipe_pay_id")!.disable();
        //si existe data entonces en modo edicion
        if (this.modelCohorteseFull) {
            this.loadDataForm();
            return;
        }
        //modo creacion
        if (!this.modelCohorteseFull) {
            return;
        }

       //observable cuandos se crea un registro nuevo
        this.sub = this.enrollementService.refreshForm$.subscribe(() => {
            this.formCohorte.reset();
        });
    }
    OnDestroy(): void {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    }

    btnSeleccionarStudent(student: StudentFullDTO) {
        this.selectedStudent = student;
        this.formCohorte.controls['student_id'].setValue(student.id);

        this.studentSelectedForViewData = true;
        this.display = false;
    }

    btnSeleccionarCohorte(cohorte: CohorteFullDTO) {
        this.selectedCohorte = cohorte;
        this.formCohorte.controls['cohorte_id'].setValue(cohorte.id);
        this.priceEffectiveOfCourse = cohorte.cost_effective
        this.cohorteSelectedForViewData = true;
        this.displayCohorte = false;

        if(this.cohorteSelectedForViewData && this.studentSelectedForViewData){
          this.formCohorte.get("tipe_pay_id")!.enable();
        }
    }
    loadDataForm() {
        console.log('this.modelCohorteseFull');
        console.log(this.modelCohorteseFull);
        this.formCohorte.patchValue(this.modelCohorteseFull);
        this.studentNameSelected = this.modelCohorteseFull.student.name;
        this.studentIdSelected = this.modelCohorteseFull.student.id;
    }

    // function personality
    initInputForm() {
        this.formCohorte = this.formBuilder.group({
            student_id: ['', [Validators.required, Validators.maxLength(100)]],
            cohorte_id: ['', [Validators.required]],
            tipe_pay_id: ['', [Validators.required]],
            cuotas: ['', [Validators.required, Validators.min(0), Validators.max(7)]],
            day_limite: ['', [Validators.required, Validators.min(1),  Validators.max(27)]],
            cash: ['', [Validators.required]],
            discount: [0, [Validators.required,Validators.min(0), Validators.max(100)]],
        });
    }
    draTable(){
        const valueCoutas:number =this.formCohorte.get('cuotas')?.value;
        const dateLimit:number =this.formCohorte.get('day_limite')?.value;
        let cont:number=1;
        let auxArrayCuotas:CuotasPaymentTableDTO[]=[];
        let amount:number=this.valRealPayment/valueCoutas;
        while(cont<=valueCoutas){
            let nowAux=moment().set({'date': dateLimit}).add(cont, 'M');
            let coutaInsert:CuotasPaymentTableDTO={
                id:cont,
                amout:amount,
                date_limit:nowAux.toString()
            };
            auxArrayCuotas.push(coutaInsert);
            cont++;
        }
        this.arrayCuotasPaymet=auxArrayCuotas;
    }
    inputCuotas(event: any){
        const valueCoutas:number =this.formCohorte.controls['cuotas'].value;
        if(valueCoutas > 7){
            this.formCohorte.get('cuotas')!.setValue(
                7
             );
        }
        // dibujar table y las cuotas
        this.draTable();
    }

    inputLimit(event: any){
        const dayLimit:number=this.formCohorte.controls['day_limite'].value;
        if(dayLimit > 27){
            this.formCohorte.get('day_limite')!.setValue(
                27
             );
        }
        //update date limite payment
        this.draTable();
    }


    inputDescount(event: any){
        if(this.typePayCodeSelected === '001'){

            this.valRealPayment=(this.selectedCohorte.cost_credit)-((this.selectedCohorte.cost_credit)*this.formCohorte.get('discount')?.value/100);
            this.draTable();
            return;
        }
        if(this.typePayCodeSelected === '002'){
            this.valRealPayment=(this.selectedCohorte.cost_effective)-((this.selectedCohorte.cost_effective)*(this.formCohorte.get('discount')?.value/100));
            this.draTable();
            return;
        }

    }

    onChange(event: any) {

        if (!event.value) return;
        let typePaysFull:TypePaysFullDTO={
            id: event.value.id,
            codigo:event.value.codigo,
            name: event.value.name
        }
        this.typePayIdSelected = Number.parseInt(event.value.id);
        this.typePayNameSelected =typePaysFull.name;
        this.typePayCodeSelected = typePaysFull.codigo


        if (event.value.codigo == '002') {
            this.activateFieldCash = true;
            this.activateFieldCuotas = false;

            this.formCohorte.get('cash')!.setValue(
              this.priceEffectiveOfCourse
            );
            this.formCohorte.get('cuotas')!.setValue(
                0
            );
            this.formCohorte.get('day_limite')!.setValue(
                1
            );
          this.valRealPayment=(this.selectedCohorte.cost_effective)-(((this.selectedCohorte.cost_effective))*this.formCohorte.get('discount')?.value/100);
          return;
        }
        if (event.value.codigo == '001') {
            this.activateFieldCuotas = true;
            this.activeDayLimite=true;
            this.activateFieldCash = false;
            //this.formCohorte.get("cuotas")!.enable();
            this.formCohorte.get('cuotas')!.setValue(
                this.priceCuotasOfCourse
            );
            this.formCohorte.get('cash')!.setValue(
                    0
                );
            this.valRealPayment=(this.selectedCohorte.cost_credit)-(((this.selectedCohorte.cost_effective))*this.formCohorte.get('discount')?.value/100);
            return;
        }
    }

    submitCohorte() {
        if (this.formCohorte.invalid) {
            this.Toast.fire({
                icon: 'warning',
                title: 'Debe completar todos los campos',
            });
            return Object.values(this.formCohorte.controls).forEach(
                (contol) => {
                    contol.markAsTouched();
                }
            );
        }
        this.formCohorte.controls['tipe_pay_id'].setValue(
            this.typePayIdSelected
        );

        const createCourse: EnrollementCreateDTO = {
            student_id: this.formCohorte.value.student_id,
            cohorte_id: this.formCohorte.value.cohorte_id,
            tipe_pay_id: this.formCohorte.value.tipe_pay_id,
            cuotas: this.formCohorte.value.cuotas,
            day_limite: this.formCohorte.value.day_limite,
            cash: this.formCohorte.value.cash,
            discount: this.formCohorte.value.discount,
        };
        console.log('this.formCohorte.value');
        console.log(this.formCohorte.value);
        debugger
        this.onSubmitCohorte.emit(createCourse);
        return;
    }
    //validate input
    get nameNotValid() {
        return (
            this.formCohorte.get('student_id')?.invalid &&
            this.formCohorte.get('student_id')?.touched
        );
    }

    get lastNameNotValid() {
        return (
            this.formCohorte.get('cohorte_id')?.invalid &&
            this.formCohorte.get('cohorte_id')?.touched
        );
    }
    get cashNotValid() {
        return (
            this.formCohorte.get('cash')?.invalid &&
            this.formCohorte.get('cash')?.touched
        );
    }
    get cuotasNotValid() {
        return (
            this.formCohorte.get('cuotas')?.invalid &&
            this.formCohorte.get('cuotas')?.touched
        );
    }
    get DayLimitNotValid() {
        return (
            this.formCohorte.get('day_limite')?.invalid &&
            this.formCohorte.get('day_limite')?.touched
        );
    }
    get userIdNotValid() {
        return (
            this.formCohorte.get('cash')?.invalid &&
            this.formCohorte.get('cash')?.touched
        );
    }
    get discountNotValid() {
        return (
            this.formCohorte.get('discount')?.invalid &&
            this.formCohorte.get('discount')?.touched
        );
    }
}


//dia limite solo minimo 1 y maximo 30
