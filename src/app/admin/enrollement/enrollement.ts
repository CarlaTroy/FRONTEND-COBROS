import { CohorteFullDTO } from "../cohorte/cohorte";
import { StudentFullDTO } from "../student/student";

export interface EnrollementFullDTO {
    id:         number;
    student:    StudentFullDTO;
    cohorte:    CohorteFullDTO;
    tipe_pay:   TypePaysFullDTO;
    cuotas:     number;
    day_limite: number;
    cash:       number;
    discount:   number;
}


export interface EnrollementCreateDTO {
    student_id:    number;
    cohorte_id:    number;
    tipe_pay_id:   number;
    cuotas:     number;
    day_limite: number;
    cash:       number;
    discount:   number;
}

export interface TypePaysFullDTO {
    id:     number;
    name:   string;
    codigo: string;
}

export interface PaymentFullDTO{
    id:number,
    amount:number,
    date_pay:string,
    status_pay:StatusPayFullDTO,
    enrollement:EnrollementFullDTO
}
export interface StatusPayFullDTO{
    id: number,
    name: string,
    codigo: string
}

export interface PaymentEditDTO {
    date_pay: string,
    status_pay_id:number
}
export interface CuotasPaymentTableDTO{
    id:number,
    date_limit:string,
    amout:number
}
