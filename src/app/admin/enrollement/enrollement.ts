import { CohorteFullDTO } from "../cohorte/cohorte";
import { StudentFullDTO } from "../student/student";

export interface EnrollementFullDTO {
    id:         number;
    student:    StudentFullDTO;
    cohorte:    CohorteFullDTO;
    tipe_pay:   TipePay;
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

export interface TipePay {
    id:     number;
    name:   string;
    codigo: string;
}